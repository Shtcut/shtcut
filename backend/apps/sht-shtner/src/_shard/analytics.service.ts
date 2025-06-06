import {
  endOfISOWeek,
  endOfMonth,
  getDate,
  getDaysInMonth,
  getMonth,
  startOfISOWeek,
  startOfMonth,
  subWeeks,
} from 'date-fns';
import { FilterQuery, Model } from 'mongoose';
import { AnalyticsOptionsDto, Dict } from 'shtcut/core';

export class AnalyticsService {
  static async getWeeklyChange(model: Model<any>, filter?: FilterQuery<any>, field?: string) {
    const _field = field ? `$${field}` : 1;
    const now = new Date();
    const startOfCurrentWeek = startOfISOWeek(now);
    const startOfPreviousWeek = startOfISOWeek(subWeeks(now, 1));
    const endOfPreviousWeek = endOfISOWeek(subWeeks(now, 1));
    const [currentWeekData, previousWeekData, totalCount] = await Promise.all([
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
        { $group: { _id: null, count: { $sum: _field } } },
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
        { $group: { _id: null, count: { $sum: _field } } },
      ]),
      model.aggregate([
        {
          $match: {
            ...filter,
          },
        },
        { $group: { _id: null, count: { $sum: _field } } },
      ]),
    ]);

    const currentCount: number = currentWeekData.length ? currentWeekData[0].count : 0;
    const previousCount: number = previousWeekData.length ? previousWeekData[0].count : 0;
    const percentageChange: number = previousCount
      ? ((currentCount - previousCount) / previousCount) * 100
      : currentCount > 0
        ? currentCount
        : 0;
    return { weeklyChange: percentageChange, last7Days: currentCount, totalCount: totalCount[0]?.count || 0 };
  }

  static async getMonthlyPlotData(
    model: Model<any>,
    { month }: AnalyticsOptionsDto,
    filter?: FilterQuery<any>,
    field?: string,
  ) {
    const _field = field ? `$${field}` : 1;
    const data: Dict = {};
    const date = new Date();
    const currentDay = getDate(date);
    const daysInMonth = getDaysInMonth(month);
    const dayData = await model.aggregate([
      {
        $match: {
          ...filter,
          createdAt: {
            $gte: startOfMonth(new Date().setMonth(month - 1)), // 0-based index
            $lt: endOfMonth(new Date().setMonth(month - 1)),
          },
        },
      },
      {
        $addFields: {
          day: { $dayOfMonth: '$createdAt' },
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

    // initialize values to either null or 0 based on if the time in consideration is in the future or past
    for (let i = 1; i <= daysInMonth; i++) {
      if (month > getMonth(date) + 1) data[i] = null; // if month is greater than current month, set values to null
      else if (i < currentDay || month <= getMonth(date) + 1) data[i] = 0;
      else data[i] = null;
    }

    dayData.map((day) => {
      data[day['day']] = day['count'];
    });
    return data;
  }

  static async getSourceDistribution(
    model: Model<any>,
    { month }: AnalyticsOptionsDto,
    filter?: FilterQuery<any>,
    field?: string,
  ) {
    const _field = field ? `$${field}` : 1;
    const date = new Date();
    const countryDistribution = await model.aggregate([
      {
        $match: {
          ...filter,
          createdAt: {
            $gte: startOfMonth(date.setMonth(month - 1)), // 0-based index
            $lt: date,
          },
        },
      },
      {
        $group: {
          _id: '$location.country.code',
          count: { $sum: _field },
          country: { $first: '$location.country' },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    return { countries: countryDistribution };
  }
}
