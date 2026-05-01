import './styles.css';

// ─── Common Components ───

export { Button } from './components/common/Button/Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './components/common/Button/Button';

export { Input, Checkbox, Calendar } from 'antd';
export type { InputProps, CheckboxProps, CalendarProps } from 'antd';

export { Tag } from './components/common/Tag/Tag';
export type { TagProps, TagVariant } from './components/common/Tag/Tag';

export { Callout, CalloutKV } from './components/common/Callout/Callout';
export type { CalloutProps, CalloutVariant } from './components/common/Callout/Callout';

export { Tabs, SegTabs } from './components/common/Tabs/Tabs';
export type { TabsProps, SegTabsProps, TabItem } from './components/common/Tabs/Tabs';

export { DeltaBadge } from './components/common/DeltaBadge/DeltaBadge';
export type { DeltaBadgeProps, DeltaDirection, DeltaSize } from './components/common/DeltaBadge/DeltaBadge';

export { EmptyState } from './components/common/EmptyState/EmptyState';
export type { EmptyStateProps, EmptyStateVariant } from './components/common/EmptyState/EmptyState';

export { SectionTitle } from './components/common/SectionTitle/SectionTitle';
export type { SectionTitleProps } from './components/common/SectionTitle/SectionTitle';

export { DrawerShell, DrawerHeader, DrawerBody, DrawerFooter } from './components/common/DrawerShell/DrawerShell';
export type { DrawerShellProps, DrawerHeaderProps, DrawerBodyProps, DrawerFooterProps, DrawerSize } from './components/common/DrawerShell/DrawerShell';

export { Divider } from './components/common/Divider/Divider';
export type { DividerProps, DividerDirection } from './components/common/Divider/Divider';

export { InfoPair } from './components/common/InfoPair/InfoPair';
export type { InfoPairProps, InfoPairDirection } from './components/common/InfoPair/InfoPair';

export { Alert } from './components/common/Alert/Alert';
export type { AlertProps, AlertVariant } from './components/common/Alert/Alert';

export { Spinner } from './components/common/Spinner/Spinner';
export type { SpinnerProps, SpinnerSize } from './components/common/Spinner/Spinner';

export { Skeleton, SkeletonBlock } from './components/common/Skeleton/Skeleton';
export type { SkeletonProps, SkeletonBlockProps } from './components/common/Skeleton/Skeleton';

export { OverviewSection } from './components/common/OverviewSection/OverviewSection';
export type { OverviewSectionProps } from './components/common/OverviewSection/OverviewSection';

export { KpiCardGrid } from './components/common/KpiCardGrid/KpiCardGrid';
export type { KpiCardGridProps, KpiCardGridColumns } from './components/common/KpiCardGrid/KpiCardGrid';

export { SegmentedBar } from './components/common/SegmentedBar/SegmentedBar';
export type { SegmentedBarProps, SegmentedBarItem } from './components/common/SegmentedBar/SegmentedBar';

export { Tooltip } from './components/common/Tooltip/Tooltip';
export type { TooltipProps, TooltipPlacement } from './components/common/Tooltip/Tooltip';

export { Drawer } from './components/common/Drawer/Drawer';
export type { DrawerProps } from './components/common/Drawer/Drawer';

export { Modal } from './components/common/Modal/Modal';
export type { ModalProps, ModalConfirmConfig } from './components/common/Modal/Modal';

export { toast } from './components/common/Toast/Toast';
export type { ToastOptions } from './components/common/Toast/Toast';

// ─── Business Components ───

export { KpiCard } from './components/business/KpiCard/KpiCard';
export type { KpiCardProps, ComparisonData, TrendItem } from './components/business/KpiCard/KpiCard';

export { InsightCard } from './components/business/InsightCard/InsightCard';
export type { InsightCardProps, InsightType, InsightTag, InsightTagStatus } from './components/business/InsightCard/InsightCard';

export { ActionCard } from './components/business/ActionCard/ActionCard';
export type { ActionCardProps, ActionPriority } from './components/business/ActionCard/ActionCard';

// ─── Chart Utilities ───

export { getChartTokens, getSeriesColor } from './utils/chartTokens';
export { generateNiceTicks, calculateDomain } from './utils/chartUtils';
export { useG2Chart } from './hooks/useG2Chart';

// ─── Chart Components ───

export { TrendSparkline } from './components/charts/TrendSparkline/TrendSparkline';
export type { TrendSparklineProps, TrendDataPoint } from './components/charts/TrendSparkline/TrendSparkline';

export { QuadrantScatterChart } from './components/charts/QuadrantScatterChart/QuadrantScatterChart';
export type {
  QuadrantScatterChartProps,
  QuadrantScatterItem,
  ReferenceLine,
  LegendItem as QuadrantLegendItem,
} from './components/charts/QuadrantScatterChart/QuadrantScatterChart';

export { StackedBarChart } from './components/charts/StackedBarChart/StackedBarChart';
export type {
  StackedBarChartProps,
  BarColumn,
  BarSegment,
} from './components/charts/StackedBarChart/StackedBarChart';

export { Card } from './components/common/Card/Card';
export type { CardProps } from './components/common/Card/Card';

export { Badge } from './components/common/Badge/Badge';
export type { BadgeProps } from './components/common/Badge/Badge';

export { Avatar } from './components/common/Avatar/Avatar';
export type { AvatarProps, AvatarSize } from './components/common/Avatar/Avatar';

export { Popover } from './components/common/Popover/Popover';
export type { PopoverProps } from './components/common/Popover/Popover';

export { PeriodPicker } from './components/common/PeriodPicker/PeriodPicker';
export type { PeriodPickerProps, TimeRange } from './components/common/PeriodPicker/PeriodPicker';

export {
  DateRangePreset,
  parseTimeRange,
  formatPeriodLabel,
  getDefaultPeriodPresets,
} from './components/common/PeriodPicker/periodUtils';
export type {
  TimePreset,
  PeriodPreset,
} from './components/common/PeriodPicker/periodUtils';

// ─── Wrapped AntD Components ───

export { Table } from './components/wrapped/Table/Table';
export type { TableProps, ColumnsType, TablePaginationConfig } from './components/wrapped/Table/Table';

export { Dropdown } from './components/wrapped/Dropdown/Dropdown';
export type { DropdownProps, MenuProps, MenuItemType } from './components/wrapped/Dropdown/Dropdown';

export { Form, FormItem, useForm } from './components/wrapped/Form/Form';
export type { FormProps, FormItemProps, FormInstance } from './components/wrapped/Form/Form';

export { Select } from './components/wrapped/Select/Select';
export type { SelectProps } from './components/wrapped/Select/Select';

export { DatePicker, RangePicker } from './components/wrapped/DatePicker/DatePicker';
export type { DatePickerProps, RangePickerProps } from './components/wrapped/DatePicker/DatePicker';

export { Progress } from './components/wrapped/Progress/Progress';
export type { ProgressProps } from './components/wrapped/Progress/Progress';

export { Menu } from './components/wrapped/Menu/Menu';

export { Breadcrumb } from './components/wrapped/Breadcrumb/Breadcrumb';
export type { BreadcrumbProps } from './components/wrapped/Breadcrumb/Breadcrumb';

export { Segmented } from './components/wrapped/Segmented/Segmented';
export type { SegmentedProps } from './components/wrapped/Segmented/Segmented';

// ─── Provider ───

export { TifenxiProvider } from './providers/ThemeProvider';
export type { TifenxiProviderProps } from './providers/ThemeProvider';

// ─── Icons (re-export from @ant-design/icons) ───

export * from './icons';
