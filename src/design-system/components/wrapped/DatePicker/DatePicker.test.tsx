import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DatePicker, RangePicker } from './DatePicker';

describe('DatePicker', () => {
  it('renders without crash', () => {
    const { container } = render(<DatePicker />);
    expect(container.querySelector('.ant-picker')).toBeInTheDocument();
  });

  it('supports placeholder', () => {
    render(<DatePicker placeholder="选择日期" />);
    expect(screen.getByPlaceholderText('选择日期')).toBeInTheDocument();
  });

  it('supports disabled', () => {
    const { container } = render(<DatePicker disabled />);
    expect(container.querySelector('.ant-picker-disabled')).toBeInTheDocument();
  });
});

describe('RangePicker', () => {
  it('renders without crash', () => {
    const { container } = render(<RangePicker />);
    expect(container.querySelector('.ant-picker')).toBeInTheDocument();
  });
});
