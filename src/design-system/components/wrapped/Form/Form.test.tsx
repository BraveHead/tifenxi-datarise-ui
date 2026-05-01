import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Form, FormItem } from './Form';

describe('Form', () => {
  it('renders form element', () => {
    render(
      <Form data-testid="my-form">
        <FormItem label="姓名" name="name">
          <input />
        </FormItem>
      </Form>,
    );
    expect(screen.getByTestId('my-form')).toBeInTheDocument();
  });

  it('renders FormItem with label', () => {
    render(
      <Form>
        <FormItem label="姓名" name="name">
          <input />
        </FormItem>
      </Form>,
    );
    expect(screen.getByText('姓名')).toBeInTheDocument();
  });

  it('supports horizontal layout', () => {
    render(
      <Form layout="horizontal" data-testid="h-form">
        <FormItem label="名称"><input /></FormItem>
      </Form>,
    );
    expect(screen.getByTestId('h-form')).toBeInTheDocument();
  });
});
