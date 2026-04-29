import { render, screen, act, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  // ── Basic rendering ───────────────────────────────────

  it('renders trigger element', () => {
    render(
      <Tooltip title="tip">
        <button>Hover me</button>
      </Tooltip>,
    );
    expect(screen.getByRole('button', { name: 'Hover me' })).toBeInTheDocument();
  });

  it('does not show tooltip content by default', () => {
    render(
      <Tooltip title="tip content">
        <button>Trigger</button>
      </Tooltip>,
    );
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  // ── Show/hide on hover ────────────────────────────────

  it('shows tooltip on mouse enter after delay', () => {
    vi.useFakeTimers();
    render(
      <Tooltip title="visible tip">
        <button>Trigger</button>
      </Tooltip>,
    );
    const trigger = screen.getByRole('button');
    act(() => {
      fireEvent.mouseEnter(trigger);
    });
    act(() => {
      vi.advanceTimersByTime(150);
    });
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    expect(screen.getByRole('tooltip')).toHaveTextContent('visible tip');
    vi.useRealTimers();
  });

  it('hides tooltip on mouse leave after delay', () => {
    vi.useFakeTimers();
    render(
      <Tooltip title="tip">
        <button>Trigger</button>
      </Tooltip>,
    );
    const trigger = screen.getByRole('button');
    act(() => {
      fireEvent.mouseEnter(trigger);
    });
    act(() => {
      vi.advanceTimersByTime(150);
    });
    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    act(() => {
      fireEvent.mouseLeave(trigger);
    });
    act(() => {
      vi.advanceTimersByTime(150);
    });
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    vi.useRealTimers();
  });

  // ── Controlled mode ───────────────────────────────────

  it('renders tooltip when open=true (controlled)', () => {
    render(
      <Tooltip title="controlled" open={true}>
        <button>Trigger</button>
      </Tooltip>,
    );
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    expect(screen.getByRole('tooltip')).toHaveTextContent('controlled');
  });

  it('does not render tooltip when open=false (controlled)', () => {
    render(
      <Tooltip title="hidden" open={false}>
        <button>Trigger</button>
      </Tooltip>,
    );
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  // ── Accessibility ─────────────────────────────────────

  it('sets aria-describedby on trigger when visible', () => {
    vi.useFakeTimers();
    render(
      <Tooltip title="accessible tip">
        <button>Trigger</button>
      </Tooltip>,
    );
    const trigger = screen.getByRole('button');

    // Before showing, no aria-describedby
    expect(trigger).not.toHaveAttribute('aria-describedby');

    act(() => {
      fireEvent.mouseEnter(trigger);
    });
    act(() => {
      vi.advanceTimersByTime(150);
    });

    expect(trigger).toHaveAttribute('aria-describedby');
    const tooltipId = trigger.getAttribute('aria-describedby')!;
    const tooltip = document.getElementById(tooltipId);
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveAttribute('role', 'tooltip');
    vi.useRealTimers();
  });

  it('tooltip has role="tooltip"', () => {
    render(
      <Tooltip title="role test" open={true}>
        <button>Trigger</button>
      </Tooltip>,
    );
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  // ── Placement ─────────────────────────────────────────

  it('accepts placement prop without error', () => {
    render(
      <Tooltip title="bottom" placement="bottom" open={true}>
        <button>Trigger</button>
      </Tooltip>,
    );
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  // ── ReactNode content ─────────────────────────────────

  it('renders ReactNode content', () => {
    render(
      <Tooltip title={<span data-testid="rich">Rich content</span>} open={true}>
        <button>Trigger</button>
      </Tooltip>,
    );
    expect(screen.getByTestId('rich')).toBeInTheDocument();
  });

  // ── className ─────────────────────────────────────────

  it('applies custom className to tooltip', () => {
    render(
      <Tooltip title="cls" open={true} className="my-tooltip">
        <button>Trigger</button>
      </Tooltip>,
    );
    expect(screen.getByRole('tooltip').className).toContain('my-tooltip');
  });
});
