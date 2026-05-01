/**
 * GIO Design 对齐回归测试
 *
 * 验证 tokens.css 中的色值、字体、图表色等是否与 GIO Design 规范一致。
 * 对应 spec: docs/gio-design-alignment-spec.md
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const tokensCSS = readFileSync(
  resolve(__dirname, '../tokens.css'),
  'utf-8',
);

/** Extract a CSS variable value from tokens.css (root scope only, before .dark) */
function getToken(name: string): string | null {
  // Split at .dark to only search root scope
  const rootSection = tokensCSS.split('.dark')[0];
  const re = new RegExp(`${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*:\\s*([^;]+);`);
  const m = rootSection.match(re);
  return m ? m[1].trim() : null;
}

/** Extract a CSS variable value from the .dark scope */
function getDarkToken(name: string): string | null {
  const darkSection = tokensCSS.split('.dark')[1]?.split('}')[0] || '';
  const re = new RegExp(`${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*:\\s*([^;]+);`);
  const m = darkSection.match(re);
  return m ? m[1].trim() : null;
}

// ── RT-1: Brand 主色 ──────────────────────────────────────

describe('RT-1: Brand / 主色 (GIO Primary)', () => {
  const expected: Record<string, string> = {
    '--brand-50':  '#E8EFFF',
    '--brand-100': '#BFD5FF',
    '--brand-200': '#9EC3FF',
    '--brand-300': '#6BA1FF',
    '--brand-400': '#3D81F5',
    '--brand-500': '#1F61E8',
    '--brand-600': '#1A55D6',
    '--brand-700': '#1347C1',
    '--brand-800': '#0A319A',
    '--brand-900': '#041E73',
  };

  for (const [token, value] of Object.entries(expected)) {
    it(`${token} = ${value}`, () => {
      expect(getToken(token)?.toUpperCase().replace(/\s*\/\*.*\*\//, '')).toContain(value);
    });
  }
});

// ── RT-2: Success 成功色 ──────────────────────────────────

describe('RT-2: Success / 成功色 (GIO Success)', () => {
  const expected: Record<string, string> = {
    '--success-bg':     '#E3FDEE',
    '--success-border': '#B1F0CD',
    '--success-200':    '#8AE5B5',
    '--success-500':    '#16A76A',
    '--success-600':    '#10915E',
    '--success-700':    '#0C8556',
  };

  for (const [token, value] of Object.entries(expected)) {
    it(`${token} = ${value}`, () => {
      expect(getToken(token)?.toUpperCase().replace(/\s*\/\*.*\*\//, '')).toContain(value);
    });
  }
});

// ── RT-3: Warning 提示色 ─────────────────────────────────

describe('RT-3: Warning / 提示色 (GIO Warning)', () => {
  const expected: Record<string, string> = {
    '--warning-bg':     '#FFF4E8',
    '--warning-border': '#FADBBC',
    '--warning-200':    '#FAC394',
    '--warning-500':    '#E8651B',
    '--warning-600':    '#D15817',
    '--warning-700':    '#C14C11',
  };

  for (const [token, value] of Object.entries(expected)) {
    it(`${token} = ${value}`, () => {
      expect(getToken(token)?.toUpperCase().replace(/\s*\/\*.*\*\//, '')).toContain(value);
    });
  }
});

// ── RT-4: Danger 错误色 ──────────────────────────────────

describe('RT-4: Danger / 错误色 (GIO Danger)', () => {
  const expected: Record<string, string> = {
    '--danger-bg':      '#FFEBE8',
    '--danger-border':  '#FFCBC7',
    '--danger-200':     '#FFAAA5',
    '--danger-500':     '#D63841',
    '--danger-600':     '#C22B35',
    '--danger-700':     '#B4232F',
  };

  for (const [token, value] of Object.entries(expected)) {
    it(`${token} = ${value}`, () => {
      expect(getToken(token)?.toUpperCase().replace(/\s*\/\*.*\*\//, '')).toContain(value);
    });
  }
});

// ── RT-5: Neutral 中性色 ─────────────────────────────────

describe('RT-5: Neutral / 中性色 (GIO Border + Fill + Text)', () => {
  const expected: Record<string, string> = {
    '--neutral-0':   '#FFFFFF',
    '--neutral-25':  '#F8F8F9',
    '--neutral-50':  '#F3F3F5',
    '--neutral-100': '#F0F0F5',
    '--neutral-200': '#E4E5E8',
    '--neutral-300': '#D7D9DD',
    '--neutral-400': '#A5A9B1',
    '--neutral-500': '#6B7280',
    '--neutral-700': '#4E5357',
    '--neutral-900': '#191C22',
  };

  for (const [token, value] of Object.entries(expected)) {
    it(`${token} = ${value}`, () => {
      expect(getToken(token)?.toUpperCase().replace(/\s*\/\*.*\*\//, '')).toContain(value);
    });
  }
});

// ── RT-6: Info 色 ────────────────────────────────────────

describe('RT-6: Info 色 (= Brand 派生)', () => {
  it('--info-bg = #E8EFFF (= brand-50)', () => {
    expect(getToken('--info-bg')?.toUpperCase()).toContain('#E8EFFF');
  });
  it('--info-border = #BFD5FF (= brand-100)', () => {
    expect(getToken('--info-border')?.toUpperCase()).toContain('#BFD5FF');
  });
  it('--info-500 = #1F61E8 (= brand-500)', () => {
    expect(getToken('--info-500')?.toUpperCase()).toContain('#1F61E8');
  });
  it('--info-700 = #1347C1 (= brand-700)', () => {
    expect(getToken('--info-700')?.toUpperCase()).toContain('#1347C1');
  });
});

// ── RT-7: 图表色 12 色序列 ───────────────────────────────

describe('RT-7: Series / 图表色 (GIO 12 色调色板)', () => {
  const expected: Record<string, string> = {
    '--series-1':  '#FC5F3A',
    '--series-2':  '#1F61E8',
    '--series-3':  '#2770EF',
    '--series-4':  '#F1683D',
    '--series-5':  '#09B982',
    '--series-6':  '#FDC002',
    '--series-7':  '#2EABFA',
    '--series-8':  '#7F39EE',
    '--series-9':  '#E440A8',
    '--series-10': '#E33A3A',
    '--series-11': '#9FDB1D',
    '--series-12': '#0FC6C2',
  };

  for (const [token, value] of Object.entries(expected)) {
    it(`${token} = ${value}`, () => {
      expect(getToken(token)?.toUpperCase().replace(/\s*\/\*.*\*\//, '')).toContain(value);
    });
  }
});

// ── RT-8: 字体 ──────────────────────────────────────────

describe('RT-8: Typography / 字体', () => {
  it('--font-sans 包含 "Nunito Sans"', () => {
    expect(getToken('--font-sans')).toContain('Nunito Sans');
  });

  it('--font-sans 包含 "PingFang SC"', () => {
    expect(getToken('--font-sans')).toContain('PingFang SC');
  });

  it('--font-num 使用 "D-DIN" 和 "Nunito Sans"', () => {
    const fontNum = getToken('--font-num');
    expect(fontNum).toContain('D-DIN');
    expect(fontNum).toContain('Nunito Sans');
  });
});

// ── RT-9: Dark Mode ─────────────────────────────────────

describe('RT-9: Dark Mode 语义色覆盖', () => {
  it('.dark 块存在', () => {
    expect(tokensCSS).toContain('.dark');
  });

  // Surface
  it('dark --surface 为深色', () => {
    const v = getDarkToken('--surface');
    expect(v).toBe('#1A1D23');
  });

  it('dark --surface-page 为最深色', () => {
    const v = getDarkToken('--surface-page');
    expect(v).toBe('#0F1115');
  });

  // Foreground
  it('dark --fg 为浅色', () => {
    const v = getDarkToken('--fg');
    expect(v).toBe('#F0F2F5');
  });

  // Semantic backgrounds recalculated for GIO colors
  it('dark --success-bg 基于 GIO #16A76A 混合', () => {
    const v = getDarkToken('--success-bg');
    expect(v).toBe('#192829');
  });

  it('dark --warning-bg 基于 GIO #E8651B 混合', () => {
    const v = getDarkToken('--warning-bg');
    expect(v).toBe('#2B2322');
  });

  it('dark --danger-bg 基于 GIO #D63841 混合', () => {
    const v = getDarkToken('--danger-bg');
    expect(v).toBe('#291F25');
  });

  it('dark --info-bg 基于 GIO #1F61E8 混合', () => {
    const v = getDarkToken('--info-bg');
    expect(v).toBe('#1A2233');
  });

  it('dark --brand-50 = dark info-bg', () => {
    expect(getDarkToken('--brand-50')).toBe('#1A2233');
  });

  it('dark --brand-100 = dark info-border', () => {
    expect(getDarkToken('--brand-100')).toBe('#1B2946');
  });
});

// ── RT-10: 硬编码修复验证 ───────────────────────────────

describe('RT-10: 组件硬编码修复', () => {
  it('Tabs 不包含 text-gray-700', () => {
    const tabsSrc = readFileSync(
      resolve(__dirname, '../components/common/Tabs/Tabs.tsx'),
      'utf-8',
    );
    expect(tabsSrc).not.toContain('text-gray-700');
    expect(tabsSrc).toContain('text-fg-body');
  });

  it('EmptyState 不包含 #DC2626', () => {
    const src = readFileSync(
      resolve(__dirname, '../components/common/EmptyState/EmptyState.tsx'),
      'utf-8',
    );
    expect(src).not.toContain('#DC2626');
    expect(src).toContain('var(--danger-500)');
  });

  it('Tooltip 不包含 bg-white text-black', () => {
    const src = readFileSync(
      resolve(__dirname, '../components/common/Tooltip/Tooltip.tsx'),
      'utf-8',
    );
    expect(src).not.toContain("'bg-white text-black");
    expect(src).toContain('bg-surface');
    expect(src).toContain('text-fg');
  });

  it('Tooltip arrow 不包含硬编码 #FFFFFF', () => {
    const src = readFileSync(
      resolve(__dirname, '../components/common/Tooltip/Tooltip.tsx'),
      'utf-8',
    );
    expect(src).not.toContain("background: '#FFFFFF'");
    expect(src).toContain('var(--surface');
  });

  it('Skeleton shimmer 使用 CSS var（rgba 作为 fallback 可保留）', () => {
    const src = readFileSync(
      resolve(__dirname, '../components/common/Skeleton/Skeleton.tsx'),
      'utf-8',
    );
    expect(src).toContain('var(--neutral-0');
  });
});

// ── RT-11: styles.css @theme 映射完整性 ─────────────────

describe('RT-11: styles.css Tailwind 映射', () => {
  const stylesSrc = readFileSync(
    resolve(__dirname, '../styles.css'),
    'utf-8',
  );

  const requiredMappings = [
    '--color-brand-300',
    '--color-brand-800',
    '--color-brand-900',
    '--color-success-200',
    '--color-success-600',
    '--color-warning-200',
    '--color-warning-600',
    '--color-danger-200',
    '--color-danger-600',
    '--color-series-7',
    '--color-series-8',
    '--color-series-9',
    '--color-series-10',
    '--color-series-11',
    '--color-series-12',
  ];

  for (const mapping of requiredMappings) {
    it(`@theme 包含 ${mapping}`, () => {
      expect(stylesSrc).toContain(mapping);
    });
  }

  it('styles.css 引入 Nunito Sans Google Font', () => {
    expect(stylesSrc).toContain('Nunito+Sans');
    expect(stylesSrc).toContain('display=swap');
  });
});

// ── RT-12: chartTokens.ts 12 色验证 ─────────────────────

describe('RT-12: chartTokens 扩展', () => {
  const src = readFileSync(
    resolve(__dirname, '../utils/chartTokens.ts'),
    'utf-8',
  );

  it('SERIES_FALLBACKS 包含 12 色', () => {
    // Count hex color entries
    const matches = src.match(/'#[A-Fa-f0-9]{6}'/g) || [];
    expect(matches.length).toBeGreaterThanOrEqual(12);
  });

  it('getSeriesColor 取模 12', () => {
    expect(src).toContain('% 12');
  });

  it('getChartTokens 遍历 12 个 series', () => {
    expect(src).toContain('10, 11, 12]');
  });

  it('SERIES_FALLBACKS 首色为 GIO 橙 #FC5F3A', () => {
    expect(src).toContain("'#FC5F3A'");
  });
});

// ── RT-13: ThemeProvider fallback 一致性 ─────────────────

describe('RT-13: ThemeProvider fallback 值', () => {
  const src = readFileSync(
    resolve(__dirname, '../providers/ThemeProvider.tsx'),
    'utf-8',
  );

  const expectedFallbacks: Record<string, string> = {
    '--success-500': '#16A76A',
    '--warning-500': '#E8651B',
    '--danger-500':  '#D63841',
    '--success-700': '#0C8556',
    '--warning-700': '#C14C11',
    '--danger-700':  '#B4232F',
    '--success-bg':  '#E3FDEE',
    '--warning-bg':  '#FFF4E8',
    '--danger-bg':   '#FFEBE8',
    '--neutral-50':  '#F3F3F5',
    '--neutral-100': '#F0F0F5',
    '--neutral-200': '#E4E5E8',
    '--neutral-900': '#191C22',
    '--neutral-700': '#4E5357',
  };

  for (const [varName, fallback] of Object.entries(expectedFallbacks)) {
    it(`getCSSVar('${varName}', '${fallback}')`, () => {
      // Check that the fallback value appears after the var name
      const pattern = `'${varName}', '${fallback}'`;
      expect(src).toContain(pattern);
    });
  }
});
