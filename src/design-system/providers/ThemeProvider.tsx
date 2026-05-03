import React, { useMemo, useLayoutEffect, useState, useEffect } from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';
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

/** Detect if <html> has class="dark" */
function isDarkMode(): boolean {
  if (typeof document === 'undefined') return false;
  return document.documentElement.classList.contains('dark');
}

/** Build AntD theme config from CSS tokens at runtime */
function buildTheme(dark: boolean): ThemeConfig {
  const brand500 = getCSSVar('--brand-500');
  const brand600 = getCSSVar('--brand-600');
  const brand700 = getCSSVar('--brand-700');
  const brand50 = getCSSVar('--brand-50');
  const success500 = getCSSVar('--success-500');
  const success700 = getCSSVar('--success-700');
  const successBg = getCSSVar('--success-bg');
  const warning500 = getCSSVar('--warning-500');
  const warning700 = getCSSVar('--warning-700');
  const warningBg = getCSSVar('--warning-bg');
  const danger500 = getCSSVar('--danger-500');
  const danger700 = getCSSVar('--danger-700');
  const dangerBg = getCSSVar('--danger-bg');
  const neutral0 = getCSSVar('--neutral-0');
  const neutral50 = getCSSVar('--neutral-50');
  const neutral100 = getCSSVar('--neutral-100');
  const neutral200 = getCSSVar('--neutral-200');
  const neutral300 = getCSSVar('--neutral-300');
  const neutral400 = getCSSVar('--neutral-400');
  const neutral500 = getCSSVar('--neutral-500');
  const neutral700 = getCSSVar('--neutral-700');
  const neutral900 = getCSSVar('--neutral-900');

  return {
    // Use AntD's darkAlgorithm when in dark mode
    algorithm: dark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
    token: {
      colorPrimary: brand500,
      colorPrimaryHover: brand600,
      colorPrimaryActive: brand700,
      colorSuccess: success500,
      colorSuccessHover: success700,
      colorSuccessActive: success700,
      colorWarning: warning500,
      colorWarningHover: warning700,
      colorWarningActive: warning700,
      colorError: danger500,
      colorErrorHover: danger700,
      colorErrorActive: danger700,
      colorInfo: getCSSVar('--info-500'),
      colorBgContainer: neutral0,
      colorBgElevated: neutral0,
      colorBgLayout: neutral50,
      colorBorder: neutral200,
      colorBorderSecondary: neutral100,
      colorSplit: neutral100,
      colorText: neutral900,
      colorTextSecondary: neutral500,
      colorTextTertiary: neutral400,
      colorTextQuaternary: neutral300,
      colorTextDisabled: neutral300,
      colorFill: neutral200,
      colorFillSecondary: neutral100,
      colorFillTertiary: neutral50,
      colorFillQuaternary: neutral50,
      borderRadius: 6,
      fontSize: 14,
      fontSizeHeading1: 18,
      fontSizeHeading2: 16,
      fontSizeHeading3: 14,
      fontFamily: getCSSVar('--font-sans'),
    },
    components: {
      Tabs: { colorPrimary: brand500 },
      Button: { colorPrimary: brand500 },
      Table: {
        headerBg: neutral50,
        headerColor: neutral700,
        headerSplitColor: neutral100,
        borderColor: neutral100,
        rowSelectedBg: brand50,
        rowSelectedHoverBg: brand50,
        cellPaddingBlock: 12,
        rowHoverBg: neutral50,
      },
      Radio: { colorPrimary: brand500 },
      Checkbox: { colorPrimary: brand500 },
      Select: {
        optionSelectedBg: brand50,
        optionActiveBg: neutral50,
      },
      Input: {
        activeBorderColor: brand500,
        hoverBorderColor: brand500,
      },
      Dropdown: {
        paddingBlock: 7,
        borderRadiusLG: 8,
        colorText: neutral700,
      },
      Menu: {
        itemBorderRadius: 8,
        itemPaddingInline: 12,
        itemHoverBg: neutral50,
        itemHoverColor: brand500,
        itemColor: neutral700,
      },
      Tag: {
        colorSuccess: success500,
        colorSuccessBg: successBg,
        colorSuccessBorder: successBg,
        colorWarning: warning500,
        colorWarningBg: warningBg,
        colorWarningBorder: warningBg,
        colorError: danger500,
        colorErrorBg: dangerBg,
        colorErrorBorder: dangerBg,
      },
      DatePicker: {
        cellActiveWithRangeBg: brand50,
      },
    },
  };
}

export function TifenxiProvider({ children, locale = zhCN }: TifenxiProviderProps) {
  const [ready, setReady] = useState(false);
  const [dark, setDark] = useState(false);

  // Wait for CSS variables to be available & detect initial dark mode
  useLayoutEffect(() => {
    setDark(isDarkMode());
    setReady(true);
  }, []);

  // Watch for .dark class changes on <html> via MutationObserver
  useEffect(() => {
    if (typeof MutationObserver === 'undefined') return;

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          // Small delay to let CSS variables update after class toggle
          requestAnimationFrame(() => setDark(isDarkMode()));
        }
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const theme = useMemo(() => (ready ? buildTheme(dark) : {}), [ready, dark]);

  return (
    <ConfigProvider theme={theme} locale={locale}>
      {children}
    </ConfigProvider>
  );
}

export default TifenxiProvider;
