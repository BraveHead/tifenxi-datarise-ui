import React, { useMemo, useLayoutEffect, useState } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import type { ThemeConfig } from 'antd';
import type { Locale } from 'antd/es/locale';

export interface TifenxiProviderProps {
  children: React.ReactNode;
  /** AntD locale, defaults to zhCN */
  locale?: Locale;
}

/**
 * Read a CSS custom property's computed value from :root.
 * Returns the raw string (e.g. "#3B82F6") or fallback.
 */
function getCSSVar(name: string, fallback = ''): string {
  if (typeof window === 'undefined') return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

/** Build AntD theme config from CSS tokens at runtime */
function buildTheme(): ThemeConfig {
  return {
    token: {
      colorPrimary: getCSSVar('--brand-500', '#3370FF'),
      colorSuccess: getCSSVar('--success-500', '#2BA471'),
      colorWarning: getCSSVar('--warning-500', '#E37318'),
      colorError: getCSSVar('--danger-500', '#E5484D'),
      colorInfo: getCSSVar('--info-500', '#3370FF'),
      colorBgContainer: getCSSVar('--neutral-0', '#FFFFFF'),
      colorBgElevated: getCSSVar('--neutral-0', '#FFFFFF'),
      colorBorder: getCSSVar('--neutral-200', '#E5E6EB'),
      colorBorderSecondary: getCSSVar('--neutral-100', '#F2F3F5'),
      colorText: getCSSVar('--neutral-900', '#1D2129'),
      colorTextSecondary: getCSSVar('--neutral-500', '#86909C'),
      colorTextTertiary: getCSSVar('--neutral-400', '#C9CDD4'),
      borderRadius: 6,
      fontFamily: getCSSVar('--font-sans', '-apple-system, BlinkMacSystemFont, sans-serif'),
    },
    components: {
      Table: {
        headerBg: getCSSVar('--neutral-50', '#F7F8FA'),
        rowHoverBg: getCSSVar('--neutral-50', '#F7F8FA'),
        borderColor: getCSSVar('--neutral-100', '#F2F3F5'),
      },
      Select: {
        optionSelectedBg: getCSSVar('--brand-50', '#E8F3FF'),
      },
      DatePicker: {
        cellActiveWithRangeBg: getCSSVar('--brand-50', '#E8F3FF'),
      },
    },
  };
}

export function TifenxiProvider({ children, locale = zhCN }: TifenxiProviderProps) {
  const [ready, setReady] = useState(false);

  // Wait for CSS variables to be available
  useLayoutEffect(() => {
    setReady(true);
  }, []);

  const theme = useMemo(() => (ready ? buildTheme() : {}), [ready]);

  return (
    <ConfigProvider theme={theme} locale={locale}>
      {children}
    </ConfigProvider>
  );
}

export default TifenxiProvider;
