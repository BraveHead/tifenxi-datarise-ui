import './styles.css';

// ─── Common Components ───

export { Button } from './components/common/Button/Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './components/common/Button/Button';

export { Input } from './components/common/Input/Input';
export type { InputProps } from './components/common/Input/Input';

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

export { OverviewSection } from './components/common/OverviewSection/OverviewSection';
export type { OverviewSectionProps } from './components/common/OverviewSection/OverviewSection';

export { KpiCardGrid } from './components/common/KpiCardGrid/KpiCardGrid';
export type { KpiCardGridProps, KpiCardGridColumns } from './components/common/KpiCardGrid/KpiCardGrid';

export { SegmentedBar } from './components/common/SegmentedBar/SegmentedBar';
export type { SegmentedBarProps, SegmentedBarItem } from './components/common/SegmentedBar/SegmentedBar';

// ─── Business Components ───

export { KpiCard } from './components/business/KpiCard/KpiCard';
export type { KpiCardProps, KpiDelta, IconBadgeVariant } from './components/business/KpiCard/KpiCard';

export { InsightCard } from './components/business/InsightCard/InsightCard';
export type { InsightCardProps, InsightType } from './components/business/InsightCard/InsightCard';

export { ActionCard } from './components/business/ActionCard/ActionCard';
export type { ActionCardProps, ActionPriority } from './components/business/ActionCard/ActionCard';
