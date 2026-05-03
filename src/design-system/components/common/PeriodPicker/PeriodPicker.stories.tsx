import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { PeriodPicker, type TimeRange } from './PeriodPicker';

const meta: Meta<typeof PeriodPicker> = {
  title: 'Common/PeriodPicker',
  component: PeriodPicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PeriodPicker>;

export const Default: Story = {
  render: function Render() {
    const [value, setValue] = useState<TimeRange>(null);
    const [presetValue, setPresetValue] = useState<string | undefined>(undefined);

    return (
      <PeriodPicker
        value={value}
        presetValue={presetValue}
        onChange={setValue}
        onConfirm={(v, pv) => {
          setValue(v);
          setPresetValue(pv);
        }}
      />
    );
  },
};

export const WithPresetValue: Story = {
  render: function Render() {
    const [value, setValue] = useState<TimeRange>(null);
    const [presetValue, setPresetValue] = useState<string | undefined>('month-lt-today:1,0');

    return (
      <PeriodPicker
        value={value}
        presetValue={presetValue}
        onChange={setValue}
        onConfirm={(v, pv) => {
          setValue(v);
          setPresetValue(pv);
        }}
      />
    );
  },
};
