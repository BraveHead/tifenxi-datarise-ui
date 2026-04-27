import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Input } from './Input';

describe('Input', () => {
  it('renders with placeholder', () => {
    render(<Input placeholder="请输入" />);
    expect(screen.getByPlaceholderText('请输入')).toBeInTheDocument();
  });

  it('renders label and associates it with input', () => {
    render(<Input label="科室名称" />);
    expect(screen.getByLabelText('科室名称')).toBeInTheDocument();
  });

  it('renders help text', () => {
    render(<Input help="最多 20 个字符" />);
    expect(screen.getByText('最多 20 个字符')).toBeInTheDocument();
  });

  it('renders error help text with danger color class', () => {
    render(<Input error help="仅支持中文" />);
    const help = screen.getByText('仅支持中文');
    expect(help.className).toContain('text-danger-500');
  });

  it('applies error border class', () => {
    render(<Input error />);
    expect(screen.getByRole('textbox').className).toContain('border-danger-500');
  });

  it('is disabled when disabled=true', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('fires onChange', async () => {
    const onChange = vi.fn();
    render(<Input onChange={onChange} />);
    await userEvent.type(screen.getByRole('textbox'), 'a');
    expect(onChange).toHaveBeenCalled();
  });

  it('applies w-full by default (block)', () => {
    render(<Input />);
    expect(screen.getByRole('textbox').className).toContain('w-full');
  });

  it('passes through className', () => {
    render(<Input className="my-custom" />);
    expect(screen.getByRole('textbox').className).toContain('my-custom');
  });
});
