import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Tag } from './Tag';

describe('Tag', () => {
  it('renders children', () => {
    render(<Tag>风险</Tag>);
    expect(screen.getByText('风险')).toBeInTheDocument();
  });

  it('defaults to neutral variant', () => {
    render(<Tag>标签</Tag>);
    expect(screen.getByText('标签').className).toContain('bg-neutral-50');
  });

  it.each([
    ['severity-high', 'severity-high-bg'],
    ['severity-mid', 'bg-warning-bg'],
    ['danger', 'bg-danger-bg'],
    ['success', 'bg-success-bg'],
    ['info', 'bg-info-bg'],
  ] as const)('applies %s variant class', (variant, expectedClass) => {
    render(<Tag variant={variant}>tag</Tag>);
    expect(screen.getByText('tag').className).toContain(expectedClass);
  });

  it('renders dot when provided', () => {
    const { container } = render(<Tag dot="danger">风险</Tag>);
    const dot = container.querySelector('.rounded-full');
    expect(dot).toBeInTheDocument();
    expect(dot?.className).toContain('bg-danger-500');
  });

  it('does not render dot by default', () => {
    const { container } = render(<Tag>标签</Tag>);
    expect(container.querySelector('.rounded-full')).not.toBeInTheDocument();
  });

  it('passes through className', () => {
    render(<Tag className="my-tag">tag</Tag>);
    expect(screen.getByText('tag').className).toContain('my-tag');
  });
});
