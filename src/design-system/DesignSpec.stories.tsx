import type { Meta, StoryObj } from '@storybook/react';

function DesignSpec() {
  return (
    <iframe
      src="/design-system.html"
      title="Make 设计系统规范"
      style={{
        width: '100%',
        height: '100vh',
        border: 'none',
      }}
    />
  );
}

const meta = {
  title: '设计系统规范',
  component: DesignSpec,
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    actions: { disable: true },
    toolbar: { disable: true },
  },
} satisfies Meta<typeof DesignSpec>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Spec: Story = {};
