/**
 * 把这段合并到你项目的 tailwind.config.{js,ts} 的 theme.extend.colors 里。
 * 取值与 tokens.css 中的 --brand-* / --neutral-* / --danger-* 保持一致。
 */
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          500: '#2563eb',
          600: '#1d4ed8',
          700: '#1e40af',
        },
        neutral: {
          0:   '#ffffff',
          25:  '#fafbfc',
          50:  '#f5f7fa',
          100: '#eef0f2',
          200: '#e2e5ea',
          300: '#cbd0d7',
          500: '#6b7280',
          700: '#374151',
          900: '#0f172a',
        },
        danger: {
          50:  '#fef2f2',
          500: '#e5484d',
          700: '#b91c1c',
        },
      },
    },
  },
};
