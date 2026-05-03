import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Select } from './Select';

describe('Select', () => {
  it('renders without crash', () => {
    render(<Select data-testid="my-select" options={[{ label: '选项', value: '1' }]} />);
    expect(screen.getByTestId('my-select')).toBeInTheDocument();
  });

  it('renders with placeholder', () => {
    render(<Select placeholder="请选择" options={[]} />);
    expect(screen.getByText('请选择')).toBeInTheDocument();
  });

  it('supports disabled prop', () => {
    const { container } = render(<Select disabled options={[]} />);
    expect(container.querySelector('.ant-select-disabled')).toBeInTheDocument();
  });
});
