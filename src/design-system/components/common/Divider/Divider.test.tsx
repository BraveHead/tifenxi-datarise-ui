import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Divider } from './Divider';

describe('Divider', () => {
  it('renders horizontal by default', () => {
    const { container } = render(<Divider />);
    const el = container.firstElementChild!;
    expect(el.className).toContain('w-full');
    expect(el.className).toContain('h-px');
  });

  it('renders vertical when direction="vertical"', () => {
    const { container } = render(<Divider direction="vertical" />);
    const el = container.firstElementChild!;
    expect(el.className).toContain('h-full');
    expect(el.className).toContain('w-px');
  });

  it('uses bg-line color', () => {
    const { container } = render(<Divider />);
    expect(container.firstElementChild!.className).toContain('bg-line');
  });

  it('is decorative by default (role="none", aria-hidden)', () => {
    const { container } = render(<Divider />);
    const el = container.firstElementChild!;
    expect(el.getAttribute('role')).toBe('none');
    expect(el.getAttribute('aria-hidden')).toBe('true');
  });

  it('is semantic when decorative=false', () => {
    const { container } = render(<Divider decorative={false} />);
    const el = container.firstElementChild!;
    expect(el.getAttribute('role')).toBe('separator');
    expect(el.getAttribute('aria-orientation')).toBe('horizontal');
  });

  it('sets aria-orientation="vertical" when vertical + non-decorative', () => {
    const { container } = render(<Divider direction="vertical" decorative={false} />);
    expect(container.firstElementChild!.getAttribute('aria-orientation')).toBe('vertical');
  });

  it('appends custom className', () => {
    const { container } = render(<Divider className="my-custom" />);
    expect(container.firstElementChild!.className).toContain('my-custom');
  });

  it('passes through data-* attributes', () => {
    const { container } = render(<Divider data-testid="divider" />);
    expect(container.querySelector('[data-testid="divider"]')).toBeInTheDocument();
  });
});
