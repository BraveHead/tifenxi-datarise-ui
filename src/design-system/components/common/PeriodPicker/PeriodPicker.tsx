import { useState, useMemo } from 'react';
import { Dropdown } from '../../wrapped/Dropdown/Dropdown';
import { Button } from '../Button/Button';
import { RangePicker } from '../../wrapped/DatePicker/DatePicker';
import { CalendarOutlined } from '@ant-design/icons';
import dayjs, { type Dayjs } from 'dayjs';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import {
  getDefaultPeriodPresets,
  parseTimeRange,
  formatPeriodLabel,
  type PeriodPreset,
} from './periodUtils';

dayjs.extend(quarterOfYear);

// ─── Types ───────────────────────────────────────────────

export type TimeRange = [Dayjs | null, Dayjs | null] | null;

export interface PeriodPickerProps {
  value?: TimeRange;
  presetValue?: string;
  /** Configurable preset list. Defaults to getDefaultPeriodPresets(). */
  presets?: PeriodPreset[];
  onChange?: (value: TimeRange) => void;
  onConfirm?: (value: TimeRange, presetValue?: string) => void;
}

type PeriodCategory = 'common' | 'historical';
type HistoricalMode = 'month' | 'quarter';

// ─── Constants ───────────────────────────────────────────

const MAX_MONTHS_BACK = 24;
const MAX_QUARTERS_BACK = 8;

const CATEGORIES = [
  { key: 'common' as const, label: '常用时间' },
  { key: 'historical' as const, label: '过去固定时段' },
];

// ─── Helpers ─────────────────────────────────────────────

/** monthId = year * 100 + month(1-indexed), e.g. 202501 = Jan 2025 */
const toMonthId = (year: number, month: number) => year * 100 + month + 1;
const monthIdYear = (id: number) => Math.floor(id / 100);
const monthIdMonth = (id: number) => (id % 100) - 1;

/** quarterId = year * 10 + quarter(1-4), e.g. 20253 = Q3 2025 */
const toQuarterId = (year: number, quarter: number) => year * 10 + quarter;
const quarterIdYear = (id: number) => Math.floor(id / 10);
const quarterIdQ = (id: number) => id % 10;

const monthIdToPresetValue = (startId: number, endId: number): string => {
  const s = String(startId).padStart(6, '0');
  const e = String(endId).padStart(6, '0');
  return startId === endId ? `period-month:${s}` : `period-month:${s},${e}`;
};

const quarterIdToPresetValue = (startId: number, endId: number): string => {
  const fmt = (id: number) => `${quarterIdYear(id)}Q${quarterIdQ(id)}`;
  return startId === endId
    ? `period-quarter:${fmt(startId)}`
    : `period-quarter:${fmt(startId)},${fmt(endId)}`;
};

const monthIdToRange = (startId: number, endId: number): TimeRange => {
  const start = dayjs()
    .year(monthIdYear(startId))
    .month(monthIdMonth(startId))
    .startOf('month');
  const end = dayjs()
    .year(monthIdYear(endId))
    .month(monthIdMonth(endId))
    .endOf('month');
  return [start, end];
};

const quarterIdToRange = (startId: number, endId: number): TimeRange => {
  const sMonth = (quarterIdQ(startId) - 1) * 3;
  const eMonth = (quarterIdQ(endId) - 1) * 3 + 2;
  const start = dayjs().year(quarterIdYear(startId)).month(sMonth).startOf('month');
  const end = dayjs().year(quarterIdYear(endId)).month(eMonth).endOf('month');
  return [start, end];
};

// ─── Display label ───────────────────────────────────────

const getDisplayText = (
  presets: PeriodPreset[],
  presetValue?: string,
  value?: TimeRange,
): string => {
  if (presetValue) {
    const periodLabel = formatPeriodLabel(presetValue);
    if (periodLabel) return periodLabel;

    const matched = presets.find((p) => p.value === presetValue);
    if (matched) return matched.label;
  }

  if (value && value[0] && value[1]) {
    return `${value[0].format('YYYY-MM-DD')} 至 ${value[1].format('YYYY-MM-DD')}`;
  }

  return '本月';
};

// ─── Main Component ──────────────────────────────────────

export const PeriodPicker = ({
  value,
  presetValue,
  presets: presetsProp,
  onChange,
  onConfirm,
}: PeriodPickerProps) => {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<PeriodCategory>('common');
  const [tempValue, setTempValue] = useState<TimeRange>(value || null);
  const [selectedPresetValue, setSelectedPresetValue] = useState<string | null>(null);

  // Historical period state
  const [historicalMode, setHistoricalMode] = useState<HistoricalMode>('month');
  const [histStart, setHistStart] = useState<number | null>(null);
  const [histEnd, setHistEnd] = useState<number | null>(null);

  const presets = presetsProp ?? getDefaultPeriodPresets();

  // ── Init state when opening ─────────────────

  const initState = () => {
    const pv = presetValue;
    setTempValue(value || null);
    setSelectedPresetValue(null);
    setHistStart(null);
    setHistEnd(null);

    if (!pv) return;

    // Quick preset?
    if (presets.find((p) => p.value === pv)) {
      setSelectedCategory('common');
      setSelectedPresetValue(pv);
      setTempValue(parseTimeRange(pv));
      return;
    }

    // period-month?
    if (pv.startsWith('period-month:')) {
      setSelectedCategory('historical');
      setHistoricalMode('month');
      const params = pv.replace('period-month:', '');
      if (params.includes(',')) {
        const [s, e] = params.split(',');
        setHistStart(parseInt(s));
        setHistEnd(parseInt(e));
      } else {
        const id = parseInt(params);
        setHistStart(id);
        setHistEnd(id);
      }
      setTempValue(parseTimeRange(pv));
      return;
    }

    // period-quarter?
    if (pv.startsWith('period-quarter:')) {
      setSelectedCategory('historical');
      setHistoricalMode('quarter');
      const params = pv.replace('period-quarter:', '');
      const parseQId = (s: string) =>
        parseInt(s.substring(0, 4)) * 10 + parseInt(s.substring(5));
      if (params.includes(',')) {
        const [s, e] = params.split(',');
        setHistStart(parseQId(s));
        setHistEnd(parseQId(e));
      } else {
        const id = parseQId(params);
        setHistStart(id);
        setHistEnd(id);
      }
      setTempValue(parseTimeRange(pv));
      return;
    }

    // Legacy format
    try {
      setTempValue(parseTimeRange(pv));
    } catch {
      // ignore
    }
  };

  // ── Handlers ────────────────────────────────

  const handlePresetClick = (preset: PeriodPreset) => {
    const pv = preset.value as string;
    const newValue = parseTimeRange(pv);
    setSelectedPresetValue(pv);
    setTempValue(newValue);
    setHistStart(null);
    setHistEnd(null);
    onChange?.(newValue);
  };

  const handleHistRangeChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    setSelectedPresetValue(null);
    if (!dates || !dates[0] || !dates[1]) {
      setHistStart(null);
      setHistEnd(null);
      setTempValue(null);
      onChange?.(null);
      return;
    }
    const [start, end] = dates;
    if (historicalMode === 'month') {
      const startId = toMonthId(start.year(), start.month());
      const endId = toMonthId(end.year(), end.month());
      setHistStart(startId);
      setHistEnd(endId);
      const range: TimeRange = [start.startOf('month'), end.endOf('month')];
      setTempValue(range);
      onChange?.(range);
    } else {
      const startId = toQuarterId(start.year(), start.quarter());
      const endId = toQuarterId(end.year(), end.quarter());
      setHistStart(startId);
      setHistEnd(endId);
      const range: TimeRange = [start.startOf('month'), end.endOf('quarter')];
      setTempValue(range);
      onChange?.(range);
    }
  };

  const handleConfirm = () => {
    let finalPresetValue = selectedPresetValue;

    if (!finalPresetValue && histStart !== null && histEnd !== null) {
      if (historicalMode === 'month') {
        finalPresetValue = monthIdToPresetValue(histStart, histEnd);
      } else {
        finalPresetValue = quarterIdToPresetValue(histStart, histEnd);
      }
    }

    if (!finalPresetValue && tempValue && tempValue[0] && tempValue[1]) {
      const matched = presets.find((p) => {
        if (typeof p.value !== 'string') return false;
        const [start, end] = parseTimeRange(p.value);
        return start.isSame(tempValue[0], 'day') && end.isSame(tempValue[1], 'day');
      });
      if (matched && typeof matched.value === 'string') {
        finalPresetValue = matched.value;
      }
    }

    onConfirm?.(tempValue, finalPresetValue || undefined);
    setOpen(false);
  };

  const handleCancel = () => {
    setTempValue(value || null);
    setOpen(false);
  };

  const handleModeSwitch = (mode: HistoricalMode) => {
    setHistoricalMode(mode);
    setHistStart(null);
    setHistEnd(null);
    setSelectedPresetValue(null);
  };

  // ── antd RangePicker value & constraints ──

  const rangeValue = useMemo((): [Dayjs, Dayjs] | undefined => {
    if (histStart === null || histEnd === null) return undefined;
    if (historicalMode === 'month') {
      return monthIdToRange(histStart, histEnd) as [Dayjs, Dayjs];
    }
    return quarterIdToRange(histStart, histEnd) as [Dayjs, Dayjs];
  }, [histStart, histEnd, historicalMode]);

  const histMinDate = useMemo(() => {
    const now = dayjs();
    if (historicalMode === 'month') {
      const back = now.subtract(MAX_MONTHS_BACK, 'month').startOf('month');
      const jan2025 = dayjs('2025-01-01');
      return back.isAfter(jan2025) ? back : jan2025;
    }
    const back = now.subtract(MAX_QUARTERS_BACK, 'quarter').startOf('quarter');
    const q12025 = dayjs('2025-01-01');
    return back.isAfter(q12025) ? back : q12025;
  }, [historicalMode]);

  // ── Render ──────────────────────────────────

  const dropdownContent = (
    <div className="w-full max-w-[800px] overflow-hidden rounded-lg border border-line bg-surface shadow-xl">
      <div className="flex">
        {/* 左侧分类导航 */}
        <div className="w-[140px] flex-shrink-0 border-r border-line bg-surface-muted/50 py-2">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`mx-3 my-1 cursor-pointer px-2 py-2 text-sm transition-colors ${
                selectedCategory === cat.key
                  ? 'bg-brand-100 font-medium text-brand-600'
                  : 'text-fg-body hover:text-brand-600'
              }`}
            >
              {cat.label}
            </div>
          ))}
        </div>

        {/* 右侧内容区 */}
        <div className="flex min-w-[460px] flex-1 flex-col">
          {selectedCategory === 'common' ? (
            /* ── 常用时间 ── */
            <div className="flex-1 p-6">
              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                {presets.map((preset) => {
                  const pv = preset.value as string;
                  const isSelected = selectedPresetValue === pv;
                  return (
                    <div
                      key={pv}
                      onClick={() => handlePresetClick(preset)}
                      className={`cursor-pointer rounded px-4 py-2 text-sm transition-colors ${
                        isSelected
                          ? 'bg-brand-100 font-medium text-brand-600'
                          : 'text-fg-body hover:bg-surface-muted'
                      }`}
                    >
                      {preset.label}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* ── 过去固定时段（历史周期） ── */
            <div className="flex flex-1 flex-col">
              {/* Mode tabs */}
              <div className="px-6 pb-3 pt-4">
                <div className="inline-flex rounded-md bg-surface-muted p-0.5">
                  {(['month', 'quarter'] as HistoricalMode[]).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => handleModeSwitch(mode)}
                      className={`rounded px-4 py-1 text-sm transition-colors ${
                        historicalMode === mode
                          ? 'bg-surface font-medium text-brand-600 shadow-sm'
                          : 'text-fg-secondary hover:text-fg-body'
                      }`}
                    >
                      {mode === 'month' ? '月份' : '季度'}
                    </button>
                  ))}
                </div>
              </div>

              {/* antd RangePicker */}
              <div className="flex-1 px-6 pb-3">
                <RangePicker
                  picker={historicalMode === 'month' ? 'month' : 'quarter'}
                  value={rangeValue}
                  onChange={handleHistRangeChange}
                  minDate={histMinDate}
                  maxDate={dayjs()}
                  placeholder={historicalMode === 'month' ? ['开始月份', '结束月份'] : ['开始季度', '结束季度']}
                  style={{ width: '100%' }}
                  getPopupContainer={(trigger) => trigger.parentElement!}
                  allowClear={false}
                />
              </div>
            </div>
          )}

          {/* 底部操作按钮 */}
          <div className="flex justify-end gap-3 border-t border-line bg-surface-muted/30 p-4">
            <Button onClick={handleCancel} className="px-6">
              取消
            </Button>
            <Button
              variant="primary"
              onClick={handleConfirm}
              disabled={!tempValue?.[0] || !tempValue?.[1]}
              className="px-6"
            >
              确定
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Dropdown
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (nextOpen) {
          initState();
        }
      }}
      dropdownRender={() => dropdownContent}
      trigger={['click']}
      placement="bottomRight"
    >
      <Button
        variant="default"
        icon={<CalendarOutlined className="text-current" />}
        className="!gap-2 rounded-md border border-line bg-surface px-3.5 text-fg-body transition-all hover:!border-brand-600 hover:!bg-surface hover:!text-brand-600"
      >
        {getDisplayText(presets, presetValue, value)}
      </Button>
    </Dropdown>
  );
};
