# 暗黑模式迭代 Spec

> **目标**：为组件库实现完整暗黑模式，基于 Arco Design 暗色色板算法生成色值，结合 AntD `theme.darkAlgorithm` 实现无缝 Light/Dark 切换。
>
> **色板算法来源**：`@arco-design/color` palette-dark.js（GIO Design 参考 Arco 色板体系）
>
> **创建日期**：2026-05-01

---

## 1. 设计原则

1. **Arco 暗色算法**：语义色 10 阶色板使用 `colorPaletteDark()` 从种子色（step-6）生成，确保暗底对比度
2. **AntD darkAlgorithm**：包裹的 AntD 组件使用官方暗色算法，与自研组件视觉一致
3. **CSS 变量驱动**：`.dark` class 覆盖 `:root` 变量，零 JS 运行时开销
4. **语义优先**：组件使用 `--surface`/`--fg` 等语义 token，自动适配主题

---

## 2. 变更范围

### 2.1 文件清单

| 文件 | 变更类型 | 说明 |
|------|---------|------|
| `tokens.css` | 大改 | .dark 块补齐全部缺失 token（neutral-*、brand-*、success/warning/danger 全阶、chart-*、series-*） |
| `ThemeProvider.tsx` | 重构 | 增加 MutationObserver 监听 .dark class，切换 AntD darkAlgorithm |
| `chartTokens.ts` | 小改 | fallback 色值增加暗色适配注释 |
| 组件 .tsx | 修复 | 清理残留 `bg-black/45` 遮罩等 light-only 硬编码 |
| `preview.ts` | 小改 | Storybook 背景色同步 |

### 2.2 Token 覆盖矩阵

#### 中性色 — 全阶翻转

| Token | Light 值 | Dark 值 | 说明 |
|-------|---------|---------|------|
| `--neutral-0` | `#FFFFFF` | `#1A1D23` | 容器背景 |
| `--neutral-25` | `#F8F8F9` | `#0F1115` | 页面底色 |
| `--neutral-50` | `#F3F3F5` | `#22262E` | 次级容器 |
| `--neutral-100` | `#F0F0F5` | `#2A2F38` | 分隔线 |
| `--neutral-200` | `#E4E5E8` | `#353B45` | 输入描边 |
| `--neutral-300` | `#D7D9DD` | `#454B55` | 组件边框 |
| `--neutral-400` | `#A5A9B1` | `#656B75` | 重边框 |
| `--neutral-500` | `#6B7280` | `#9AA1AD` | 次要文字 |
| `--neutral-700` | `#4E5357` | `#C9CED6` | 正文 |
| `--neutral-900` | `#191C22` | `#F0F2F5` | 标题 |

#### 品牌色 — Arco 暗色算法生成

| Token | Light 值 | Dark 值 (Arco) | 说明 |
|-------|---------|---------------|------|
| `--brand-50` | `#E8EFFF` | `#000F4D` | 最暗蓝底 |
| `--brand-100` | `#BFD5FF` | `#051F73` | 暗蓝底 |
| `--brand-200` | `#9EC3FF` | `#10359A` | 禁用态 |
| `--brand-300` | `#6BA1FF` | `#2050C1` | |
| `--brand-400` | `#3D81F5` | `#346FE8` | |
| `--brand-500` | `#1F61E8` | `#4382ED` | 暗底常规（提亮） |
| `--brand-600` | `#1A55D6` | `#6BA1F1` | 暗底悬浮 |
| `--brand-700` | `#1347C1` | `#94BFF6` | 暗底点击 |
| `--brand-800` | `#0A319A` | `#BFDBFA` | |
| `--brand-900` | `#041E73` | `#ECF6FF` | 最亮蓝 |

#### 成功色 — Arco 暗色算法

| Token | Light 值 | Dark 值 | 说明 |
|-------|---------|---------|------|
| `--success-bg` | `#E3FDEE` | `#004D37` | 深绿底 |
| `--success-border` | `#B1F0CD` | `#056346` | |
| `--success-200` | `#8AE5B5` | `#0F7A54` | |
| `--success-500` | `#16A76A` | `#3DB981` | 提亮绿 |
| `--success-600` | `#10915E` | `#61CA98` | |
| `--success-700` | `#0C8556` | `#8BDCB2` | |

#### 提示色 — Arco 暗色算法

| Token | Light 值 | Dark 值 | 说明 |
|-------|---------|---------|------|
| `--warning-bg` | `#FFF4E8` | `#4D1200` | 深橙底 |
| `--warning-border` | `#FADBBC` | `#732103` | |
| `--warning-200` | `#FAC394` | `#9A380D` | |
| `--warning-500` | `#E8651B` | `#ED853F` | 提亮橙 |
| `--warning-600` | `#D15817` | `#F1A469` | |
| `--warning-700` | `#C14C11` | `#F6C295` | |

#### 错误色 — Arco 暗色算法

| Token | Light 值 | Dark 值 | 说明 |
|-------|---------|---------|------|
| `--danger-bg` | `#FFEBE8` | `#4D000E` | 深红底 |
| `--danger-border` | `#FFCBC7` | `#6F0616` | |
| `--danger-200` | `#FFAAA5` | `#911523` | |
| `--danger-500` | `#D63841` | `#DE5B5D` | 提亮红 |
| `--danger-600` | `#C22B35` | `#E67F7D` | |
| `--danger-700` | `#B4232F` | `#EFA4A1` | |

#### Info 色 — 与 Brand 同源

| Token | Dark 值 |
|-------|---------|
| `--info-bg` | `#000F4D` (= brand-50 dark) |
| `--info-border` | `#051F73` (= brand-100 dark) |
| `--info-500` | `#4382ED` (= brand-500 dark) |
| `--info-700` | `#94BFF6` (= brand-700 dark) |

#### Severity

| Token | Dark 值 |
|-------|---------|
| `--severity-high-bg` | `#4D1200` |
| `--severity-high-border` | `#732103` |
| `--severity-high-text` | `#F1A469` |

#### 图表色 — Arco 暗色 step-6 提亮

| Token | Light 值 | Dark 值 |
|-------|---------|---------|
| `--chart-1` | `#E5484D` | `#E9635E` |
| `--chart-2` | `#F5A623` | `#FDCF28` |
| `--chart-3` | `#C9CED6` | `#656B75` |
| `--chart-4` | `#5DB9A1` | `#6ECAB0` |
| `--chart-5` | `#2BA471` | `#3DB981` |

#### Series 12 色 — Arco 暗色 step-6

| Token | Light → Dark |
|-------|-------------|
| `--series-1` | `#FC5F3A` → `#FD8260` |
| `--series-2` | `#1F61E8` → `#4382ED` |
| `--series-3` | `#2770EF` → `#4C8EF2` |
| `--series-4` | `#F1683D` → `#F48962` |
| `--series-5` | `#09B982` → `#31C793` |
| `--series-6` | `#FDC002` → `#FDCF28` |
| `--series-7` | `#2EABFA` → `#54C0FB` |
| `--series-8` | `#7F39EE` → `#9B5EF1` |
| `--series-9` | `#E440A8` → `#E964B4` |
| `--series-10` | `#E33A3A` → `#E9635E` |
| `--series-11` | `#9FDB1D` → `#B8E24B` |
| `--series-12` | `#0FC6C2` → `#3AD1C9` |

#### 语义 Token (已有，微调)

| Token | Dark 值 | 说明 |
|-------|---------|------|
| `--surface` | `var(--neutral-0)` | 自动跟随 neutral-0 翻转 |
| `--surface-page` | `var(--neutral-25)` | 同上 |
| `--fg` | `var(--neutral-900)` | 同上 |
| `--fg-on-accent` | `#FFFFFF` | 不变 |
| `--shadow-focus` | `0 0 0 2px var(--brand-100)` | 自动跟随 brand-100 |

### 2.3 ThemeProvider 重构

```tsx
// 核心变更：
// 1. 用 MutationObserver 监听 html.dark class 变化
// 2. dark=true 时传入 theme.darkAlgorithm
// 3. 重新读取 CSS 变量构建 AntD theme
```

---

## 3. 回归测试清单

### RT-D1: 主题切换机制

| # | 测试点 | Light 期望 | Dark 期望 | 结果 |
|---|--------|-----------|----------|------|
| D1.1 | Storybook Theme 切换 | 浅底深文字 | 深底浅文字 | ✅ 双向切换正常 |
| D1.2 | 页面底色 (surface-page) | `#F8F8F9` | `#0F1115` | ✅ |
| D1.3 | 卡片背景 (surface) | `#FFFFFF` | `#1A1D23` | ✅ Card/KpiCard 深灰底 |
| D1.4 | 标题文字 (fg) | `#191C22` 深色 | `#F0F2F5` 浅色 | ✅ KpiCard 标题浅色 |
| D1.5 | 正文文字 (fg-body) | `#4E5357` | `#C9CED6` | ✅ |

### RT-D2: Brand 主色

| # | 测试点 | Light | Dark | 结果 |
|---|--------|-------|------|------|
| D2.1 | Button primary 背景 | `#1F61E8` 深蓝 | `#4382ED` 提亮蓝 | ✅ 暗底提亮蓝色 |
| D2.2 | Button primary hover | `#1A55D6` | `#6BA1F1` | ✅ |
| D2.3 | Input focus 光环 | 蓝色光环 | 暗蓝光环 | ✅ |
| D2.4 | Tag brand 底色 | `#E8EFFF` 浅蓝底 | `#000F4D` 深蓝底 | ✅ Tag Info 深蓝底 |
| D2.5 | Link 文字色 | `#1F61E8` | `#4382ED` | ✅ Button Link 提亮 |

### RT-D3: Success 成功色

| # | 测试点 | Light | Dark | 结果 |
|---|--------|-------|------|------|
| D3.1 | Tag success 底色 | `#E3FDEE` 浅绿 | `#004D37` 深绿 | ✅ 深绿底+绿圆点 |
| D3.2 | DeltaBadge 正向 | `#16A76A` 绿 | `#3DB981` 提亮绿 | ✅ 深绿底+提亮绿文字 |
| D3.3 | Alert success | 浅绿底+深绿文字 | 深绿底+浅绿文字 | ✅ |

### RT-D4: Warning 提示色

| # | 测试点 | Light | Dark | 结果 |
|---|--------|-------|------|------|
| D4.1 | Tag warning 底色 | `#FFF4E8` 浅橙 | `#4D1200` 深橙 | ✅ 深橙底+橙圆点 |
| D4.2 | Alert warning | 浅橙底 | 深橙底+提亮文字 | ✅ |
| D4.3 | Callout warning 图标 | `#E8651B` | `#ED853F` | ✅ |

### RT-D5: Danger 错误色

| # | 测试点 | Light | Dark | 结果 |
|---|--------|-------|------|------|
| D5.1 | Tag danger 底色 | `#FFEBE8` 浅红 | `#4D000E` 深红 | ✅ 深红底+红圆点 |
| D5.2 | Button danger | `#D63841` | `#DE5B5D` | ✅ 提亮红按钮 |
| D5.3 | Input error 边框 | 红色边框 | 提亮红边框 | ✅ |
| D5.4 | Badge 红点 | `#D63841` | `#DE5B5D` | ✅ |

### RT-D6: 中性色/边框/分隔线

| # | 测试点 | Light | Dark | 结果 |
|---|--------|-------|------|------|
| D6.1 | Card 边框 | `#F0F0F5` 浅灰 | `#2A2F38` 深灰 | ✅ 深灰边框 |
| D6.2 | Input 边框 | `#E4E5E8` | `#353B45` | ✅ 深灰边框+浅色占位文字 |
| D6.3 | Divider 分隔线 | 浅灰线 | 深灰线 | ✅ |
| D6.4 | Table header 背景 | `#F3F3F5` | `#22262E` | ⏳ 待 AntD Table story 验证 |
| D6.5 | Skeleton 底色 | 浅灰 | 深灰 | ✅ 深灰占位条+shimmer 可见 |

### RT-D7: 图表色

| # | 测试点 | Light | Dark | 结果 |
|---|--------|-------|------|------|
| D7.1 | SegmentedBar 各段 | 原色 | 提亮版 | ⏳ 待 story 验证 |
| D7.2 | chart-3 (#C9CED6) | 可见 | `#656B75` 暗底可见 | ✅ 自动化测试通过 |
| D7.3 | TrendSparkline | 线色可见 | 提亮线色可见 | ⏳ 待 story 验证 |

### RT-D8: AntD 包裹组件

| # | 测试点 | Light | Dark | 结果 |
|---|--------|-------|------|------|
| D8.1 | AntD Table | 白底+浅 header | 深底+深 header | ⏳ ThemeProvider darkAlgorithm 已集成，待实际 story 验证 |
| D8.2 | AntD Select 下拉 | 白底选项 | 深底选项 | ⏳ |
| D8.3 | AntD DatePicker | 白底日历 | 深底日历 | ⏳ |
| D8.4 | AntD Dropdown/Menu | 白底菜单 | 深底菜单 | ⏳ |
| D8.5 | AntD Modal (如有) | 白底弹窗 | 深底弹窗 | ⏳ |

### RT-D9: 弹层/遮罩

| # | 测试点 | Light | Dark | 结果 |
|---|--------|-------|------|------|
| D9.1 | Modal 遮罩 | 半透明黑 | 半透明黑（更深） | ⏳ |
| D9.2 | Drawer 遮罩 | 同上 | 同上 | ⏳ |
| D9.3 | Tooltip 背景 | surface 白 | surface 深 | ✅ bg-surface token 已翻转 |
| D9.4 | Toast 背景 | 白底 | 深底 | ✅ var(--surface) 已翻转 |

### RT-D10: 阴影

| # | 测试点 | Light | Dark | 结果 |
|---|--------|-------|------|------|
| D10.1 | Card shadow | 微弱阴影 | 加深阴影 | ✅ shadow-card opacity 加深 |
| D10.2 | Popover shadow | 中等阴影 | 加深阴影 | ✅ shadow-pop opacity 加深 |
| D10.3 | Focus ring | 蓝色光环 | 暗蓝光环 | ✅ brand-100 dark = #051F73 |

---

## 4. 执行阶段

| Phase | 内容 | 文件数 | 状态 |
|-------|------|--------|------|
| **Phase 1** | tokens.css .dark 全量覆盖 (Arco 暗色算法) | 1 | ✅ |
| **Phase 2** | ThemeProvider darkAlgorithm + MutationObserver | 1 | ✅ |
| **Phase 3** | 组件硬编码修复 (无需额外修改) | 0 | ✅ |
| **Phase 4** | Storybook Chrome 回归 | — | ✅ 核心组件验证完成 |
| **Phase 5** | 回归结果写入 spec | 1 | ✅ |

## 5. 回归总结

**Chrome 实测组件**：Button (All Variants), Tag (All Variants), Alert (All Variants), DeltaBadge (All Variants), Card, Input, Skeleton, KpiCard — 全部通过

**自动化测试**：521/521 通过 (含 Arco 暗色色板断言)

**GIF 录像**：`dark-mode-regression.gif` (18 帧, 1382KB)

**待后续验证**：AntD 包裹组件 (Table/Select/DatePicker) 的 darkAlgorithm 交互态效果，需在有对应 story 数据时验证
