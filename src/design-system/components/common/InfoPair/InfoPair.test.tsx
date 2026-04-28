import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { InfoPair } from './InfoPair';

describe('InfoPair', () => {
  it('renders label and value', () => {
    render(<InfoPair label="满意度" value="92.3%" />);
    expect(screen.getByText('满意度')).toBeInTheDocument();
    expect(screen.getByText('92.3%')).toBeInTheDocument();
  });

  it('defaults to horizontal direction', () => {
    const { container } = render(<InfoPair label="a" value="b" />);
    expect(container.firstElementChild!.className).toContain('items-baseline');
  });

  it('supports vertical direction', () => {
    const { container } = render(<InfoPair label="a" value="b" direction="vertical" />);
    expect(container.firstElementChild!.className).toContain('flex-col');
  });

  it('label uses text-fg-secondary', () => {
    const { container } = render(<InfoPair label="a" value="b" />);
    const label = container.querySelector('.text-fg-secondary');
    expect(label).toBeInTheDocument();
    expect(label!.textContent).toBe('a');
  });

  it('value uses text-fg and font-medium', () => {
    const { container } = render(<InfoPair label="a" value="b" />);
    const value = container.querySelector('.font-medium');
    expect(value).toBeInTheDocument();
    expect(value!.textContent).toBe('b');
  });

  it('supports ReactNode as value', () => {
    render(<InfoPair label="total" value={<span data-testid="custom">2,090</span>} />);
    expect(screen.getByTestId('custom')).toBeInTheDocument();
  });

  it('appends custom className', () => {
    const { container } = render(<InfoPair label="a" value="b" className="my-class" />);
    expect(container.firstElementChild!.className).toContain('my-class');
  });

  it('passes through data-* attributes', () => {
    render(<InfoPair label="a" value="b" data-testid="pair" />);
    expect(screen.getByTestId('pair')).toBeInTheDocument();
  });
});
