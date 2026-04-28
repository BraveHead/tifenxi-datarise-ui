import type { Preview } from '@storybook/react';
import { useEffect } from 'react';
import '../src/design-system/styles.css';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: '主题切换',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: '☀️ 浅色', icon: 'sun' },
          { value: 'dark', title: '🌙 深色', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light';

      useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      }, [theme]);

      return Story();
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      values: [
        { name: 'Page', value: '#FAFBFC' },
        { name: 'White', value: '#FFFFFF' },
        { name: 'Dark Page', value: '#0F1115' },
        { name: 'Dark Surface', value: '#1A1D23' },
      ],
    },
  },
};

export default preview;
