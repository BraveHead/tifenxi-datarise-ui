import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Segmented } from './Segmented';

describe('Segmented', () => {
  it('renders options', () => {
    render(<Segmented options={['日', '周', '月']} />);
    expect(screen.getByText('日')).toBeInTheDocument();
    expect(screen.getByText('周')).toBeInTheDocument();
    expect(screen.getByText('月')).toBeInTheDocument();
  });

  it('renders with object options', () => {
    render(
      <Segmented
        options={[
          { label: '全部', value: 'all' },
          { label: '活跃', value: 'active' },
        ]}
      />,
    );
    expect(screen.getByText('全部')).toBeInTheDocument();
    expect(screen.getByText('活跃')).toBeInTheDocument();
  });
});
