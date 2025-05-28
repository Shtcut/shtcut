import { InjectModel } from '@nestjs/mongoose';
import { endOfISOWeek, getWeekOfMonth, startOfISOWeek, subWeeks } from 'date-fns';
import { FilterQuery, Model } from 'mongoose';
import { Hit, HitDocument } from 'shtcut/core';

export class AnalyticsService {
  constructor(@InjectModel(Hit.name) protected hitModel: Model<HitDocument>) {}
  static async getHourlyPlotData(model: Model<any>, filter?: FilterQuery<any>, field?: string) {
    const _field = field ? `$${field}` : 1;
    const data = {};
    const _data = await model.aggregate([
      {
        $match: {
          ...filter,
          createdAt: {
            $gte: new Date(new Date().setUTCHours(0, 0, 0, 0)),
          },
        },
      },
      {
        $addFields: {
          hour: { $hour: '$createdAt' },
        },
      },
      {
        $group: {
          _id: '$hour',
          hour: { $first: '$hour' },
          count: { $sum: _field },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    for (let i = 0; i < 24; i++) data[i] = 0;
    _data.map((index) => {
      data[index['hour']] = index['count'];
    });
    return data;
  }

  static async getDaysInWeekPlotData(model: Model<any>, filter?: FilterQuery<any>, field?: string) {
    const _field = field ? `$${field}` : 1;
    const data = {};
    const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    const daysInWeekData = await model.aggregate([
      {
        $match: {
          ...filter,
          createdAt: {
            $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          },
        },
      },
      {
        $addFields: {
          day: { $isoDayOfWeek: '$createdAt' },
        },
      },
      {
        $group: {
          _id: '$day',
          day: { $first: '$day' },
          count: { $sum: _field },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    days.map((day) => {
      data[day] = 0;
    });
    daysInWeekData.map((day) => {
      data[days[day['day'] - 1]] = day['count'];
    });
    return data;
  }

  static async getWeeklyPlotData(model: Model<any>, filter?: FilterQuery<any>, field?: string) {
    const _field = field ? { [field]: 1 } : {};
    const data = {};
    const weeks = [1, 2, 3, 4, 5];
    const currentWeek = getWeekOfMonth(new Date());
    const weeksData = await model.aggregate([
      {
        $match: {
          ...filter,
          createdAt: {
            $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            $lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
          },
        },
      },
      {
        $project: {
          _id: 1,
          createdAt: 1,
          ..._field,
        },
      },
      { $sort: { _id: 1 } },
    ]);
    weeks.map((week) => {
      data[week] = week <= currentWeek ? 0 : null;
    });
    weeksData.map((index) => {
      const week = getWeekOfMonth(index.createdAt);
      data[week] += index[field] || 1;
    });
    return data;
  }

  static async getMonthlyPlotData(model: Model<any>, filter?: FilterQuery<any>, field?: string) {
    const _field = field ? `$${field}` : 1;
    const data = {};
    const months = [
      'january',
      'february',
      'march',
      'april',
      'may',
      'june',
      'july',
      'august',
      'september',
      'october',
      'november',
      'december',
    ];
    const year = new Date().getUTCFullYear();
    const currentMonth = new Date().getUTCMonth();
    const monthData = await model.aggregate([
      {
        $match: {
          ...filter,
          createdAt: {
            $gte: new Date(year, 0, 1),
            $lt: new Date(year + 1, 0, 1),
          },
        },
      },
      {
        $addFields: {
          month: { $month: '$createdAt' },
        },
      },
      {
        $group: {
          _id: '$month',
          month: { $first: '$month' },
          count: { $sum: _field },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    months.map((month, index) => {
      data[month] = index <= currentMonth ? 0 : null;
    });
    monthData.map((month) => {
      data[months[month['month'] - 1]] = month['count'];
    });
    return data;
  }

  static async getYearlyPlotData(model: Model<any>, filter?: FilterQuery<any>, field?: string) {
    const _field = field ? `$${field}` : 1;
    const data = {};
    const year = new Date().getUTCFullYear();
    const yearlyData = await model.aggregate([
      {
        $match: {
          ...filter,
          createdAt: {
            $gte: new Date(year - 5, 0, 1),
            // $lt: new Date(year + 3, 0, 1),
          },
        },
      },
      {
        $addFields: {
          year: { $year: '$createdAt' },
        },
      },
      {
        $group: {
          _id: '$year',
          count: { $sum: _field },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    for (let i = 1; i < 5; i++) {
      data[year - i] = 0;
    }

    yearlyData.map((year) => {
      data[year['_id']] = year['count'];
    });
    return data;
  }

  async getWeeklyChange(model: Model<any>, filter?: FilterQuery<any>) {
    const now = new Date();
    const startOfCurrentWeek = startOfISOWeek(now);
    const startOfPreviousWeek = startOfISOWeek(subWeeks(now, 1));
    const endOfPreviousWeek = endOfISOWeek(subWeeks(now, 1));
    const [currentWeekData, previousWeekData] = await Promise.all([
      model.aggregate([
        {
          $match: {
            ...filter,
            createdAt: {
              $gte: startOfCurrentWeek,
              $lte: now,
            },
          },
        },
        { $group: { _id: null, count: { $sum: 1 } } },
      ]),
      model.aggregate([
        {
          $match: {
            ...filter,
            createdAt: {
              $gte: startOfPreviousWeek,
              $lte: endOfPreviousWeek,
            },
          },
        },
        { $group: { _id: null, count: { $sum: 1 } } },
      ]),
    ]);

    const currentCount: number = currentWeekData.length ? currentWeekData[0].count : 0;
    const previousCount: number = previousWeekData.length ? previousWeekData[0].count : 0;
    const percentageChange: number = previousCount
      ? ((currentCount - previousCount) / previousCount) * 100
      : currentCount > 0
        ? currentCount
        : 0;
    return percentageChange;
  }
}
