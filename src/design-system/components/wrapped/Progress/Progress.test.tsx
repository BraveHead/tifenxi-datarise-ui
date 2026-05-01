import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Progress } from './Progress';

describe('Progress', () => {
  it('renders without crash', () => {
    const { container } = render(<Progress percent={50} />);
    expect(container.querySelector('.ant-progress')).toBeInTheDocument();
  });

  it('renders percentage text', () => {
    render(<Progress percent={75} />);
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('supports showInfo=false', () => {
    render(<Progress percent={75} showInfo={false} />);
    expect(screen.queryByText('75%')).not.toBeInTheDocument();
  });

  it('supports status prop', () => {
    const { container } = render(<Progress percent={100} status="success" />);
    expect(container.querySelector('.ant-progress-status-success')).toBeInTheDocument();
  });
});
