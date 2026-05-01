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
  const brand500 = getCSSVar('--brand-500', '#1F61E8');
  const brand600 = getCSSVar('--brand-600', '#1A55D6');
  const brand700 = getCSSVar('--brand-700', '#1347C1');
  const brand50 = getCSSVar('--brand-50', '#E8EFFF');
  const success500 = getCSSVar('--success-500', '#16A76A');
  const success700 = getCSSVar('--success-700', '#0C8556');
  const successBg = getCSSVar('--success-bg', '#E3FDEE');
  const warning500 = getCSSVar('--warning-500', '#E8651B');
  const warning700 = getCSSVar('--warning-700', '#C14C11');
  const warningBg = getCSSVar('--warning-bg', '#FFF4E8');
  const danger500 = getCSSVar('--danger-500', '#D63841');
  const danger700 = getCSSVar('--danger-700', '#B4232F');
  const dangerBg = getCSSVar('--danger-bg', '#FFEBE8');
  const neutral50 = getCSSVar('--neutral-50', '#F3F3F5');
  const neutral100 = getCSSVar('--neutral-100', '#F0F0F5');
  const neutral200 = getCSSVar('--neutral-200', '#E4E5E8');
  const neutral400 = getCSSVar('--neutral-400', '#A5A9B1');
  const neutral700 = getCSSVar('--neutral-700', '#4E5357');
  const neutral900 = getCSSVar('--neutral-900', '#191C22');

  return {
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
      colorInfo: getCSSVar('--info-500', '#1F61E8'),
      colorBgContainer: getCSSVar('--neutral-0', '#FFFFFF'),
      colorBgElevated: getCSSVar('--neutral-0', '#FFFFFF'),
      colorBgLayout: neutral50,
      colorBorder: neutral200,
      colorBorderSecondary: neutral100,
      colorSplit: neutral100,
      colorText: neutral900,
      colorTextSecondary: getCSSVar('--neutral-500', '#6B7280'),  /* 保持不变 */
      colorTextTertiary: neutral400,
      colorTextQuaternary: getCSSVar('--neutral-300', '#D7D9DD'),
      colorTextDisabled: getCSSVar('--neutral-300', '#D7D9DD'),
      colorFill: neutral200,
      colorFillSecondary: neutral100,
      colorFillTertiary: neutral50,
      colorFillQuaternary: neutral50,
      borderRadius: 6,
      fontSize: 14,
      fontSizeHeading1: 18,
      fontSizeHeading2: 16,
      fontSizeHeading3: 14,
      fontFamily: getCSSVar('--font-sans', '-apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif'),
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
