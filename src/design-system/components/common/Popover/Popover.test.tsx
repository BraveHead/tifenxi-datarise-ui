import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Popover } from './Popover';

describe('Popover', () => {
  it('renders trigger element', () => {
    render(
      <Popover content="弹出内容" title="标题">
        <button>触发</button>
      </Popover>,
    );
    expect(screen.getByText('触发')).toBeInTheDocument();
  });

  it('renders without crash with minimal props', () => {
    render(
      <Popover content="内容">
        <span>hover me</span>
      </Popover>,
    );
    expect(screen.getByText('hover me')).toBeInTheDocument();
  });
});
