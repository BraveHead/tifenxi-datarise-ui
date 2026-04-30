import type { Meta, StoryObj } from '@storybook/react';
import { QuadrantScatterChart } from './QuadrantScatterChart';
import type { QuadrantScatterItem, LegendItem } from './QuadrantScatterChart';

const meta: Meta<typeof QuadrantScatterChart> = {
  title: 'Charts/QuadrantScatterChart',
  component: QuadrantScatterChart,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    height: { control: { type: 'number', min: 200, max: 600, step: 50 } },
    defaultPointSize: { control: { type: 'number', min: 4, max: 20, step: 2 } },
  },
};

export default meta;
type Story = StoryObj<typeof QuadrantScatterChart>;

const sampleData: QuadrantScatterItem[] = [
  { id: '1', name: '内科', x: 320, y: 12, category: 'high', interactive: true },
  { id: '2', name: '外科', x: 280, y: 8, category: 'high', interactive: true },
  { id: '3', name: '儿科', x: 150, y: 18, category: 'low', interactive: true },
  { id: '4', name: '妇产科', x: 200, y: 5, category: 'high', interactive: true },
  { id: '5', name: '眼科', x: 90, y: 3, category: 'medium', interactive: true },
  { id: '6', name: '口腔科', x: 60, y: 15, category: 'low', interactive: true },
  { id: '7', name: '皮肤科', x: 180, y: 10, category: 'medium', interactive: true },
  { id: '8', name: '骨科', x: 250, y: 20, category: 'low', interactive: true },
  { id: '9', name: '耳鼻喉科', x: 130, y: 6, category: 'medium', interactive: true },
  { id: '10', name: '中医科', x: 100, y: 9, category: 'medium', interactive: true },
];

const colorMap: Record<string, string> = {
  high: 'var(--success-500, #2BA471)',
  medium: 'var(--series-1, #3B82F6)',
  low: 'var(--danger-500, #E5484D)',
};

const legendItems: LegendItem[] = [
  { label: '高满意度', color: 'var(--success-500, #2BA471)' },
  { label: '中满意度', color: 'var(--series-1, #3B82F6)' },
  { label: '低满意度', color: 'var(--danger-500, #E5484D)' },
];

export const Default: Story = {
  args: {
    data: sampleData,
    xLabel: '接诊量',
    yLabel: '差评数',
    colorMap,
    legendItems,
    xReferenceLine: { value: 180, dashed: true },
    yReferenceLine: { value: 10, dashed: true },
    height: 350,
  },
};

export const NoReferenceLines: Story = {
  args: {
    data: sampleData,
    xLabel: '接诊量',
    yLabel: '差评数',
    colorMap,
    height: 300,
  },
};

export const WithSelection: Story = {
  args: {
    data: sampleData,
    xLabel: '接诊量',
    yLabel: '差评数',
    colorMap,
    legendItems,
    xReferenceLine: { value: 180, dashed: true },
    yReferenceLine: { value: 10, dashed: true },
    selectedId: '3',
    height: 350,
  },
};

export const SmallDataset: Story = {
  args: {
    data: sampleData.slice(0, 4),
    xLabel: 'X',
    yLabel: 'Y',
    height: 250,
    defaultPointSize: 12,
  },
};
