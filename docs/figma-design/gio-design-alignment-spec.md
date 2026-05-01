# GIO Design 对齐迭代 Spec

> **迭代目标**：将 tifenxi-datarise-ui 组件库的设计 Token 从当前 Make Design 体系对齐至 GIO Design 规范，确保色值、字体、图表色板与 Figma 设计稿一致。
>
> **Figma 源**：[GIO-Design-new / Color](https://www.figma.com/design/ER7Me40aWi8rdBm7VQN6C8/GIO-Design-new?node-id=313-2914)
>
> **创建日期**：2026-05-01
> **最后更新**：2026-05-01
> **状态**：✅ 全部完成（含 Dark Mode + Nunito Sans + 自动化回归）

---

## 1. 变更范围

### 1.1 文件清单

| 文件 | 变更类型 | 说明 |
|------|---------|------|
| `src/design-system/tokens.css` | 改值 + 新增 | 色值源头，全量对齐 GIO Design |
| `src/design-system/styles.css` | 新增映射 | @theme inline 补充新增 token |
| `src/design-system/utils/chartTokens.ts` | 扩展 | 图表色从 6 色扩至 12 色 |
| `src/design-system/providers/ThemeProvider.tsx` | 更新 fallback | fallback 值同步新色值 |
| `src/design-system/components/common/Tabs/Tabs.tsx` | 修复 | 硬编码 `text-gray-700` → token |
| `src/design-system/components/common/EmptyState/EmptyState.tsx` | 修复 | 硬编码 `#DC2626` → token |
| `src/design-system/components/common/Tooltip/Tooltip.tsx` | 修复 | 内联白/黑色 → token |
| `src/design-system/components/common/Skeleton/Skeleton.tsx` | 修复 | shimmer 渐变色 → token |

### 1.2 不在本次范围

- Dark Mode 色值重算（后续迭代）
- 新增组件
- 前端 `ti-datarise-frontend` 消费侧适配

---

## 2. Token 变更明细

### 2.1 Brand / 主色

| Token | 旧值 | 新值 (GIO) | 动作 |
|-------|------|-----------|------|
| `--brand-50` | `#e8efff` | `#E8EFFF` | 不变 |
| `--brand-100` | `#d0dfff` | `#BFD5FF` | 改值 |
| `--brand-200` | `#a8c3ff` | `#9EC3FF` | 改值 |
| `--brand-300` | — | `#6BA1FF` | 新增 |
| `--brand-400` | `#6b8ef0` | `#3D81F5` | 改值 |
| `--brand-500` | `#1f61e8` | `#1F61E8` | 不变 |
| `--brand-600` | `#1a55d6` | `#1A55D6` | 不变 |
| `--brand-700` | `#1347c1` | `#1347C1` | 不变 |
| `--brand-800` | — | `#0A319A` | 新增 |
| `--brand-900` | — | `#041E73` | 新增 |

### 2.2 Success / 成功色

| Token | 旧值 | 新值 (GIO) | 动作 |
|-------|------|-----------|------|
| `--success-bg` | `#E8F6EF` | `#E3FDEE` | 改值 |
| `--success-border` | `#BCE3CD` | `#B1F0CD` | 改值 |
| `--success-200` | — | `#8AE5B5` | 新增 |
| `--success-500` | `#2BA471` | `#16A76A` | 改值 |
| `--success-600` | — | `#10915E` | 新增 |
| `--success-700` | `#1B7A52` | `#0C8556` | 改值 |

### 2.3 Warning / 提示色

| Token | 旧值 | 新值 (GIO) | 动作 |
|-------|------|-----------|------|
| `--warning-bg` | `#FEF5E7` | `#FFF4E8` | 改值 |
| `--warning-border` | `#F5D79A` | `#FADBBC` | 改值 |
| `--warning-200` | — | `#FAC394` | 新增 |
| `--warning-500` | `#F5A623` | `#E8651B` | 改值 (色相大变：金橙→橙棕) |
| `--warning-600` | — | `#D15817` | 新增 |
| `--warning-700` | `#B5740F` | `#C14C11` | 改值 |

### 2.4 Danger / 错误色

| Token | 旧值 | 新值 (GIO) | 动作 |
|-------|------|-----------|------|
| `--danger-bg` | `#FDECEC` | `#FFEBE8` | 改值 |
| `--danger-border` | `#F5B9BB` | `#FFCBC7` | 改值 |
| `--danger-200` | — | `#FFAAA5` | 新增 |
| `--danger-500` | `#E5484D` | `#D63841` | 改值 |
| `--danger-600` | — | `#C22B35` | 新增 |
| `--danger-700` | `#AD1F24` | `#B4232F` | 改值 |

### 2.5 Info 色（派生自 Brand）

| Token | 旧值 | 新值 (GIO) | 动作 |
|-------|------|-----------|------|
| `--info-bg` | `#EAF3FE` | `#E8EFFF` | 改值 (= brand-50) |
| `--info-border` | `#BBD6F7` | `#BFD5FF` | 改值 (= brand-100) |
| `--info-500` | `#1f61e8` | 不变 | — |
| `--info-700` | `#1F5EC0` | `#1347C1` | 改值 (= brand-700) |

### 2.6 Neutral - Border

| Token | 旧值 | 新值 (GIO) | GIO 名 |
|-------|------|-----------|--------|
| `--neutral-100` | `#EEF0F2` | `#F0F0F5` | color-border-1 浅 |
| `--neutral-200` | `#E1E4E8` | `#E4E5E8` | color-border-2 一般 |
| `--neutral-300` | `#C9CED6` | `#D7D9DD` | color-border-3 深 |
| `--neutral-400` | `#9AA1AD` | `#A5A9B1` | color-border-4 重 |

### 2.7 Neutral - Fill

| Token | 旧值 | 新值 (GIO) | GIO 名 |
|-------|------|-----------|--------|
| `--neutral-0` | `#FFFFFF` | 不变 | — |
| `--neutral-25` | `#FAFBFC` | `#F8F8F9` | color-fill-1 浅色背景 |
| `--neutral-50` | `#F5F7FA` | `#F3F3F5` | color-fill-2 组件/禁用 |

### 2.8 Neutral - Text

GIO Design 使用 rgba 透明度方案，本库保持实色方案但对齐等效值（白底计算）：

| Token | 旧值 | 新值 (白底等效) | GIO 定义 |
|-------|------|---------------|---------|
| `--neutral-900` | `#1F2328` | `#191C22` | rgba(2,6,14, 0.90) 标题 |
| `--neutral-700` | `#374151` | `#4E5357` | rgba(2,8,19, 0.70) 正文 |
| `--neutral-500` | `#6B7280` | `#6B7280` | **保持不变** (见 2.11) |

### 2.9 Severity 色

保持不变，GIO Design 未定义独立严重度色阶。

### 2.10 图表色扩展

tokens.css 中 `--series-*` 从 6 色扩至 12 色：

| Token | 旧值 | 新值 (GIO palette) |
|-------|------|-------------------|
| `--series-1` | `#1f61e8` | `#FC5F3A` (GIO橙) |
| `--series-2` | `#2BA471` | `#1F61E8` (主色蓝) |
| `--series-3` | `#F5A623` | `#2770EF` (蓝) |
| `--series-4` | `#8B5CF6` | `#F1683D` (GIO橙2) |
| `--series-5` | `#EC4899` | `#09B982` (绿) |
| `--series-6` | `#14B8A6` | `#FDC002` (金) |
| `--series-7` | — | `#2EABFA` (天蓝) |
| `--series-8` | — | `#7F39EE` (紫) |
| `--series-9` | — | `#E440A8` (玫红) |
| `--series-10` | — | `#E33A3A` (红) |
| `--series-11` | — | `#9FDB1D` (黄绿) |
| `--series-12` | — | `#0FC6C2` (青蓝) |

`--chart-1 ~ --chart-5`（满意度 1-5 分色阶）保持不变，GIO Design 未定义对应色阶。

### 2.11 决策记录

| 决策 | 结论 | 原因 |
|------|------|------|
| Text rgba vs 实色 | 保持实色方案 | Tailwind/AntD 兼容性；rgba 在非白底场景不可控 |
| neutral-500 是否改为 GIO text-3 等效值 | **不改** | GIO text-3 白底等效 `#A4AAB5` WCAG AA 对比度仅 2.6:1，不满足可访问性要求。保留 `#6B7280`（4.6:1）作为次要文字色 |
| 字体 Nunito Sans | **本次不改** | 需引入 Web Font 加载，影响首屏性能，拆为独立迭代 |
| Dark Mode | **本次不改** | 新色值的暗色适配需完整设计走查，拆为独立迭代 |
| chart-1~5 满意度色阶 | **不改** | GIO Design 未定义对应色阶，保持现有业务语义 |

### 2.12 Typography

已引入 Nunito Sans (Google Fonts, display=swap)，更新 font-sans 和 font-num 字体栈。D-DIN 作为数字首选字体加入 font-num。

### 2.13 Dark Mode (已完成)

基于新 GIO 色值，使用 8%/18% 不透明度混合算法重新计算所有语义色暗底覆盖值。

---

## 3. 执行阶段

### Phase 1 — tokens.css 全量对齐 ✅

更新所有色值、新增缺失 token。单文件变更。

### Phase 2 — styles.css @theme 映射 ✅

为新增 token 添加 Tailwind v4 映射，使 `bg-brand-300` 等新类名可用。

### Phase 3 — chartTokens.ts 图表色扩展 ✅

Series 从 6 色扩至 12 色，fallback 和取模逻辑同步。

### Phase 4 — ThemeProvider fallback 同步 ✅

所有 getCSSVar fallback 值更新为 GIO 色值。

### Phase 5 — 组件硬编码修复 ✅

Tabs/EmptyState/Tooltip/Skeleton/KpiCard/SegmentedBar 硬编码色值全部替换。

### Phase 6 — Dark Mode 重算 ✅

语义色暗底覆盖值重新计算。

### Phase 7 — Nunito Sans 字体引入 ✅

Google Fonts @import + font-display: swap。

### Phase 8 — 自动化回归测试 ✅

106 项 GIO 对齐专项测试 + 519 项全量组件测试，全部通过。

### Phase 3 — chartTokens.ts 图表色扩展

- 扩展 `--series-*` 至 12 色
- 更新 `SERIES_FALLBACKS` 数组
- `getSeriesColor()` 取模改为 12

**验证方式**：`getSeriesColor(0)` 返回 `#FC5F3A`，`getSeriesColor(11)` 返回 `#0FC6C2`。

### Phase 4 — ThemeProvider fallback 值同步

更新 `buildTheme()` 中所有 `getCSSVar()` 的 fallback 参数，保持与 tokens.css 一致。

**验证方式**：AntD 组件（Table, Select, DatePicker, Tag）在 Storybook 中颜色正确。

### Phase 5 — 组件硬编码修复

| 组件 | 修复项 |
|------|--------|
| `Tabs.tsx` | `text-gray-700` → `text-fg-body` |
| `EmptyState.tsx` | `#DC2626` → `text-danger-500` |
| `Tooltip.tsx` | 内联 #FFFFFF/#000000 → `var(--surface)` / `var(--fg)` |
| `Skeleton.tsx` | shimmer 渐变色 → 基于 `var(--neutral-100)` / `var(--neutral-50)` |

**验证方式**：对应 story 渲染正确，无硬编码色值残留。

---

## 4. 回归测试清单

### 4.1 Brand 主色

- [ ] **Button primary**：常规 #1F61E8 → hover #1A55D6 → active #1347C1
- [ ] **Button primary disabled**：brand-200 (#9EC3FF) 底色
- [ ] **Input focus**：brand-500 边框 + 光环
- [ ] **Avatar**：brand-100 (#BFD5FF) 底 + brand-700 文字
- [ ] **Tag brand**：brand-50 底 + brand-200 边 + brand-700 文字
- [ ] **InsightCard brand**：brand-500 左边框 + brand-50 底色
- [ ] **AntD Select**：选中项背景 brand-50
- [ ] **AntD DatePicker**：范围选中底色 brand-50
- [ ] **AntD Menu**：hover 文字色 brand-500
- [ ] **SectionTitle**：badge 背景 brand-500

### 4.2 Success 成功色

- [ ] **Tag success**：bg #E3FDEE + 文字 #0C8556 + 边 #B1F0CD
- [ ] **Alert success**：背景/图标/边框
- [ ] **Callout success**：图标 + 背景
- [ ] **DeltaBadge 正向**：success-500 (#16A76A) 箭头 + success-bg 底色
- [ ] **InsightCard positive**：左边框 + 底色 + 文字
- [ ] **KpiCard 上升趋势**：success 颜色
- [ ] **Toast success**：图标 success-500

### 4.3 Warning 提示色 (重点)

- [ ] **Tag warning**：bg #FFF4E8 + 文字 #C14C11 + 边 #FADBBC
- [ ] **Alert warning**：背景/图标/边框，**确认橙棕色可读**
- [ ] **Callout warning**：图标 #E8651B 对比度
- [ ] **InsightCard warning**：左边框色
- [ ] **AntD Warning 派生**：hover/active 态
- [ ] **Toast warning**：图标色
- [ ] **KpiCard 异常**：warning 底色

### 4.4 Danger 错误色

- [ ] **Tag danger**：bg #FFEBE8 + 文字 #B4232F + 边 #FFCBC7
- [ ] **Alert danger**：背景/图标/边框
- [ ] **Button danger**：#D63841 三态
- [ ] **DeltaBadge 负向**：danger-500 箭头
- [ ] **Input error**：danger-500 边框 + 光环
- [ ] **Badge**：红色圆点 danger-500
- [ ] **EmptyState error**：图标色（硬编码修复后）
- [ ] **ActionCard urgent**：danger-bg 底 + danger-500 图标

### 4.5 Neutral 中性色

- [ ] **页面底色**：surface-page → neutral-25 (#F8F8F9)
- [ ] **Card**：白底 + 边框 neutral-100 (#F0F0F5)
- [ ] **Input 默认**：边框 neutral-200 (#E4E5E8)
- [ ] **Divider**：分隔线 neutral-100
- [ ] **Table header**：表头背景 neutral-50 (#F3F3F5)
- [ ] **Skeleton**：底色 neutral-100
- [ ] **DrawerShell**：背景/边框/分隔线
- [ ] **Modal**：背景/头部/底部

### 4.6 文字色

- [ ] **标题文字**：neutral-900 (#191C22) 可读
- [ ] **正文文字**：neutral-700 (#4E5357) 对比度 ≥ 4.5:1
- [ ] **次要文字**：neutral-500 (#6B7280) 不变
- [ ] **OverviewSection**：标题/副标题/描述层次清晰
- [ ] **InfoPair**：label + value 层次

### 4.7 图表色

- [ ] **TrendSparkline**：默认 series-1 变为 #FC5F3A
- [ ] **StackedBarChart**：传色渲染正确
- [ ] **QuadrantScatterChart**：散点/参考线/tooltip
- [ ] **SegmentedBar**：分段色条
- [ ] **getSeriesColor()**：12 色循环正确
- [ ] **getChartTokens()**：series 返回 12 色

### 4.8 硬编码修复

- [ ] **Tabs**：非激活 tab 文字跟随 fg-body
- [ ] **EmptyState error**：图标色跟随 danger-500
- [ ] **Tooltip**：背景/文字跟随 surface/fg
- [ ] **Skeleton**：shimmer 渐变跟随 neutral token

### 4.9 AntD 主题联动

- [ ] **ThemeProvider fallback**：所有 fallback 与 tokens.css 一致
- [ ] **AntD Tag**：success/warning/error 颜色正确
- [ ] **AntD Table**：header/hover/selected 颜色
- [ ] **AntD Input**：focus/hover 边框色
- [ ] **AntD Select**：选中项/hover 背景
- [ ] **AntD DatePicker**：范围选中底色

---

## 5. 风险项

| 风险 | 影响 | 缓解措施 |
|------|------|---------|
| Warning 色相大变 (#F5A623 → #E8651B) | 所有 warning 组件视觉变化显著 | Phase 1 后 Storybook 截图走查 |
| AntD 派生色异常 | AntD 基于种子色自动生成 hover/disabled 色 | Phase 4 逐组件验证 |
| series-1 从蓝变橙 | 图表默认首色变化 | 与业务确认图表色序 |
| neutral-700 文字变浅 | 正文可读性 | 验证 WCAG AA 对比度 |
