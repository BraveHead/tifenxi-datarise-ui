import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Callout, CalloutKV } from './Callout';

describe('Callout', () => {
  it('renders children', () => {
    render(<Callout>提示信息</Callout>);
    expect(screen.getByText('提示信息')).toBeInTheDocument();
  });

  it('has role="status"', () => {
    render(<Callout>msg</Callout>);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('defaults to info variant', () => {
    render(<Callout>info</Callout>);
    expect(screen.getByRole('status').className).toContain('bg-info-bg');
  });

  it.each([
    ['warning', 'bg-warning-bg'],
    ['danger', 'bg-danger-bg'],
    ['success', 'bg-success-bg'],
  ] as const)('applies %s variant', (variant, expectedClass) => {
    render(<Callout variant={variant}>msg</Callout>);
    expect(screen.getByRole('status').className).toContain(expectedClass);
  });

  it('renders icon slot', () => {
    render(<Callout icon={<span data-testid="icon">i</span>}>msg</Callout>);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders without icon', () => {
    const { container } = render(<Callout>msg</Callout>);
    expect(container.querySelectorAll('[data-testid]')).toHaveLength(0);
  });
});

describe('CalloutKV', () => {
  it('renders label and value', () => {
    render(<CalloutKV label="样本量" value="2,090 份" />);
    expect(screen.getByText('样本量')).toBeInTheDocument();
    expect(screen.getByText('2,090 份')).toBeInTheDocument();
  });
});
