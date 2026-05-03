import type { Meta, StoryObj } from '@storybook/react';
import { Form, FormItem } from './Form';
import { Input } from 'antd';
import { Button } from '../../common/Button/Button';

const meta = {
  title: 'Wrapped/Form',
  component: Form,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Form layout="vertical" style={{ maxWidth: 400 }}>
      <FormItem label="用户名" name="username" rules={[{ required: true, message: '请输入用户名' }]}>
        <Input placeholder="请输入用户名" />
      </FormItem>
      <FormItem label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
        <Input.Password placeholder="请输入密码" />
      </FormItem>
      <FormItem>
        <Button variant="primary" type="submit">登录</Button>
      </FormItem>
    </Form>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <Form layout="horizontal" style={{ maxWidth: 500 }}>
      <FormItem label="姓名" name="name">
        <Input placeholder="请输入" />
      </FormItem>
      <FormItem label="科室" name="department">
        <Input placeholder="请输入" />
      </FormItem>
    </Form>
  ),
};
