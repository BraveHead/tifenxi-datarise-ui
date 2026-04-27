import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Tabs, SegTabs } from './Tabs';

const items = [
  { key: 'a', label: 'Tab A' },
  { key: 'b', label: 'Tab B' },
  { key: 'c', label: 'Tab C' },
];

describe('Tabs (underline)', () => {
  it('renders all tab items', () => {
    render(<Tabs items={items} activeKey="a" onChange={() => {}} />);
    expect(screen.getAllByRole('tab')).toHaveLength(3);
  });

  it('marks active tab with aria-selected', () => {
    render(<Tabs items={items} activeKey="b" onChange={() => {}} />);
    expect(screen.getByText('Tab B')).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Tab A')).toHaveAttribute('aria-selected', 'false');
  });

  it('calls onChange on click', async () => {
    const onChange = vi.fn();
    render(<Tabs items={items} activeKey="a" onChange={onChange} />);
    await userEvent.click(screen.getByText('Tab B'));
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('active tab has brand color class', () => {
    render(<Tabs items={items} activeKey="a" onChange={() => {}} />);
    expect(screen.getByText('Tab A').className).toContain('text-brand-600');
  });
});

describe('SegTabs (capsule)', () => {
  it('renders all tab items', () => {
    render(<SegTabs items={items} activeKey="a" onChange={() => {}} />);
    expect(screen.getAllByRole('tab')).toHaveLength(3);
  });

  it('marks active tab with aria-selected', () => {
    render(<SegTabs items={items} activeKey="c" onChange={() => {}} />);
    expect(screen.getByText('Tab C')).toHaveAttribute('aria-selected', 'true');
  });

  it('calls onChange on click', async () => {
    const onChange = vi.fn();
    render(<SegTabs items={items} activeKey="a" onChange={onChange} />);
    await userEvent.click(screen.getByText('Tab C'));
    expect(onChange).toHaveBeenCalledWith('c');
  });

  it('active tab has white background class', () => {
    render(<SegTabs items={items} activeKey="a" onChange={() => {}} />);
    expect(screen.getByText('Tab A').className).toContain('bg-neutral-0');
  });
});
