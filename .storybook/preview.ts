import type { Preview } from '@storybook/react';
import '../src/design-system/styles.css';

const preview: Preview = {
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
      ],
    },
  },
};

export default preview;
