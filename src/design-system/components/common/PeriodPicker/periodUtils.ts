import dayjs, { type Dayjs } from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isoWeek from 'dayjs/plugin/isoWeek';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';

dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);
dayjs.extend(quarterOfYear);

/**
 * 时间范围预设值
 *
 * 格式规则：
 *   unit:duration,offset
 *     - unit: day | week | month | quarter | year，加 -lt-today 后缀表示截止到昨天
 *     - duration: 从当前周期起向前数的周期总数（含当前周期）
 *     - offset: 从最近端跳过的周期数（offset=1 表示排除当前周期）
 *
 *   unit:prev
 *     - 上一个完整周期
 */
export enum DateRangePreset {
  Today = 'day:1,0',
  Yesterday = 'day:2,1',
  ThisWeek = 'week-lt-today:1,0',
  LastWeek = 'week:prev',
  ThisMonth = 'month-lt-today:1,0',
  LastMonth = 'month:prev',
  ThisQuarter = 'quarter-lt-today:1,0',
  LastQuarter = 'quarter:prev',
  ThisYear = 'year-lt-today:1,0',
  LastYear = 'year:prev',
  Past7Days = 'day:8,1',
  Past30Days = 'day:31,1',
  Past90Days = 'day:91,1',
  Past180Days = 'day:181,1',
  Past4Weeks = 'week:5,1',
  Past3Months = 'month:4,1',
  Past4Quarters = 'quarter:5,1',
}

export interface TimePreset {
  label: string;
  value: [Dayjs, Dayjs] | string | DateRangePreset;
}

export interface PeriodPreset extends TimePreset {
  group: string;
}

/**
 * 解析时间范围表达式
 */
export const parseTimeRange = (expression: string): [Dayjs, Dayjs] => {
  const now = dayjs();
  const yesterday = now.subtract(1, 'day').endOf('day');

  // period-month:YYYYMM 或 period-month:YYYYMM,YYYYMM
  if (expression.startsWith('period-month:')) {
    const params = expression.replace('period-month:', '');
    const parseMonth = (s: string) => {
      const year = parseInt(s.substring(0, 4));
      const month = parseInt(s.substring(4, 6)) - 1;
      return dayjs().year(year).month(month).date(1);
    };
    if (params.includes(',')) {
      const [s, e] = params.split(',');
      return [parseMonth(s).startOf('month'), parseMonth(e).endOf('month')];
    }
    const d = parseMonth(params);
    return [d.startOf('month'), d.endOf('month')];
  }

  // period-quarter:YYYYQN 或 period-quarter:YYYYQN,YYYYQN
  if (expression.startsWith('period-quarter:')) {
    const params = expression.replace('period-quarter:', '');
    const parseQ = (s: string) => {
      const year = parseInt(s.substring(0, 4));
      const q = parseInt(s.substring(5));
      const startMonth = (q - 1) * 3;
      return dayjs().year(year).month(startMonth).date(1);
    };
    if (params.includes(',')) {
      const [s, e] = params.split(',');
      const endQ = parseInt(e.substring(5));
      const endStartMonth = (endQ - 1) * 3 + 2;
      return [parseQ(s).startOf('month'), dayjs().year(parseInt(e.substring(0, 4))).month(endStartMonth).endOf('month')];
    }
    const d = parseQ(params);
    return [d.startOf('month'), d.month(d.month() + 2).endOf('month')];
  }

  // abs:startMs,endMs
  if (expression.startsWith('abs:')) {
    const [startMs, endMs] = expression.replace('abs:', '').split(',');
    if (startMs && endMs) {
      return [dayjs(Number(startMs)), dayjs(Number(endMs))];
    }
    return [now, now];
  }

  const [unitPart, modifier] = expression.split(':');

  const isLtToday = unitPart.endsWith('-lt-today');
  let baseUnit = isLtToday ? unitPart.replace('-lt-today', '') : unitPart;
  if (baseUnit === 'week') baseUnit = 'isoWeek';

  const unit = baseUnit as dayjs.OpUnitType;
  const subtractUnit = ((unit as string) === 'isoWeek' ? 'week' : unit) as dayjs.ManipulateType;

  if (modifier === 'prev') {
    const prevDate = now.subtract(1, subtractUnit);
    return [prevDate.startOf(unit), prevDate.endOf(unit)];
  }

  if (modifier.includes(',')) {
    const [durationStr, offsetStr] = modifier.split(',');
    const duration = parseInt(durationStr, 10);
    const offset = parseInt(offsetStr, 10);

    const start = now.subtract(duration - 1, subtractUnit).startOf(unit);
    const end = (offset === 0 && isLtToday) ? yesterday : now.subtract(offset, subtractUnit).endOf(unit);

    return [start, end];
  }

  return [now, now];
};

/**
 * 格式化 period-month/period-quarter 值为显示文案
 */
export const formatPeriodLabel = (value: string): string | null => {
  if (value.startsWith('period-month:')) {
    const params = value.replace('period-month:', '');
    if (params.includes(',')) {
      const [s, e] = params.split(',');
      const startYear = s.substring(0, 4);
      const startMonth = parseInt(s.substring(4, 6));
      const endYear = e.substring(0, 4);
      const endMonth = parseInt(e.substring(4, 6));
      if (startYear === endYear) {
        return `${startYear}年${startMonth}月 - ${endMonth}月`;
      }
      return `${startYear}年${startMonth}月 - ${endYear}年${endMonth}月`;
    }
    const year = params.substring(0, 4);
    const month = parseInt(params.substring(4, 6));
    return `${year}年${month}月`;
  }
  if (value.startsWith('period-quarter:')) {
    const params = value.replace('period-quarter:', '');
    if (params.includes(',')) {
      const [s, e] = params.split(',');
      const startYear = s.substring(0, 4);
      const startQ = s.substring(4);
      const endYear = e.substring(0, 4);
      const endQ = e.substring(4);
      if (startYear === endYear) {
        return `${startYear}年${startQ} - ${endQ}`;
      }
      return `${startYear}年${startQ} - ${endYear}年${endQ}`;
    }
    const year = params.substring(0, 4);
    const q = params.substring(4);
    return `${year}年${q}`;
  }
  return null;
};

/**
 * 获取周期选择器默认预设
 */
export const getDefaultPeriodPresets = (): PeriodPreset[] => {
  return [
    { label: '上周', value: DateRangePreset.LastWeek, group: '周' },
    { label: '过去4周', value: DateRangePreset.Past4Weeks, group: '周' },
    { label: '本月', value: DateRangePreset.ThisMonth, group: '月' },
    { label: '上月', value: DateRangePreset.LastMonth, group: '月' },
    { label: '过去3月', value: DateRangePreset.Past3Months, group: '月' },
    { label: '本季度', value: DateRangePreset.ThisQuarter, group: '季' },
    { label: '上季度', value: DateRangePreset.LastQuarter, group: '季' },
    { label: '过去4季度', value: DateRangePreset.Past4Quarters, group: '季' },
    { label: '今年', value: DateRangePreset.ThisYear, group: '年' },
    { label: '去年', value: DateRangePreset.LastYear, group: '年' },
  ];
};
