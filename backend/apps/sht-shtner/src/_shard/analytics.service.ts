import { endOfISOWeek, getDate, getDaysInMonth, startOfISOWeek, startOfMonth, subWeeks } from 'date-fns';
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
        { $group: { _id: null, count: { $sum: 1 } } },
      ]),
      model.countDocuments(filter),
    ]);

    const currentCount: number = currentWeekData.length ? currentWeekData[0].count : 0;
    const previousCount: number = previousWeekData.length ? previousWeekData[0].count : 0;
    const percentageChange: number = previousCount
      ? ((currentCount - previousCount) / previousCount) * 100
      : currentCount > 0
        ? currentCount
        : 0;
    return { weeklyChange: percentageChange, last7Days: currentCount, totalCount };
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
    const daysInMonth = getDaysInMonth(date);
    const dayData = await model.aggregate([
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

    for (let i = 1; i <= daysInMonth; i++) {
      data[i] = i <= currentDay ? 0 : null;
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
