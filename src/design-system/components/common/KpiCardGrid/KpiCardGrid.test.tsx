import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { KpiCardGrid } from './KpiCardGrid';

describe('KpiCardGrid', () => {
  it('renders children', () => {
    render(
      <KpiCardGrid>
        <div data-testid="card1">卡片1</div>
        <div data-testid="card2">卡片2</div>
      </KpiCardGrid>
    );
    expect(screen.getByTestId('card1')).toBeInTheDocument();
    expect(screen.getByTestId('card2')).toBeInTheDocument();
  });

  it('defaults to 4 columns', () => {
    const { container } = render(<KpiCardGrid><div>card</div></KpiCardGrid>);
    expect(container.firstElementChild!.className).toContain('xl:grid-cols-4');
  });

  it('applies columns=3 classes', () => {
    const { container } = render(<KpiCardGrid columns={3}><div>card</div></KpiCardGrid>);
    expect(container.firstElementChild!.className).toContain('lg:grid-cols-3');
    expect(container.firstElementChild!.className).not.toContain('xl:grid-cols-4');
  });

  it('applies columns=2 classes', () => {
    const { container } = render(<KpiCardGrid columns={2}><div>card</div></KpiCardGrid>);
    expect(container.firstElementChild!.className).toContain('sm:grid-cols-2');
    expect(container.firstElementChild!.className).not.toContain('lg:grid-cols-3');
  });

  it('applies columns=1 class', () => {
    const { container } = render(<KpiCardGrid columns={1}><div>card</div></KpiCardGrid>);
    expect(container.firstElementChild!.className).toContain('grid-cols-1');
    expect(container.firstElementChild!.className).not.toContain('sm:grid-cols-2');
  });

  it('has grid layout with gap and stretch', () => {
    const { container } = render(<KpiCardGrid><div>card</div></KpiCardGrid>);
    const el = container.firstElementChild!;
    expect(el.className).toContain('grid');
    expect(el.className).toContain('gap-sp-4');
    expect(el.className).toContain('items-stretch');
  });

  it('appends custom className', () => {
    const { container } = render(<KpiCardGrid className="my-grid"><div>card</div></KpiCardGrid>);
    expect(container.firstElementChild!.className).toContain('my-grid');
  });
});
