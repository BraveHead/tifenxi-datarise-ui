# 组件抽象计划 — 从 ti-datarise-frontend 提取至 UI 组件库

## 背景

分析 `ti-datarise-frontend/src/components/` 中的通用组件，按照业务/公共组件逻辑，将可复用的组件抽象到当前 UI 组件库 (`tifenxi-datarise-ui`)。设计规范以组件库中现有 tokens 和 Tailwind-only 风格为基准。

## 抽象原则

1. **Tailwind-only** — 不引入 Ant Design / framer-motion 等外部 UI 依赖
2. **Token 驱动** — 所有颜色、间距、圆角、阴影使用 `tokens.css` 中的设计变量
3. **无路由依赖** — 不使用 react-router，链接通过回调传递
4. **轻量函数组件** — 使用 `cx()` 拼接类名，ref 转发用于交互元素
5. **CSF3 Stories** — 每个组件配套 Storybook 故事

## 排除说明

以下前端组件**不适合**抽象到 UI 库：
- `InputSearch` — 依赖 Ant Design Input
- `HeaderIconWrapper` — 导航栏专用，业务耦合
- `TableActionMenu` — 依赖 Ant Design Dropdown
- `BusinessModal` — 依赖 Ant Design Modal
- `TabContainer` — 依赖 Ant Design Tabs
- `ButtonTabContainer` — 使用 display:none 状态保持，UI 库已有 `SegTabs`
- `MetricCardItem` — 依赖 framer-motion + themeVariables，UI 库已有更优的 `KpiCard`
- `DataStateView` — 依赖 Ant Design Spin/Empty，UI 库已有 `EmptyState`
- `EllipsisName` — 依赖 Ant Design Tooltip
- `AIInsightCard` — 依赖 Ant Design Tag/Typography + react-router

---

## Tier 1: 公共组件

### 1. Divider（源: LineGap）

**用途**: 内容间分隔线，支持横向/竖向

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | 分隔线方向 |
| `className` | `string` | — | 自定义类名 |

**设计规范**:
- 横向: `w-full h-px bg-neutral-100`
- 竖向: `h-full w-px bg-neutral-100`
- 使用 `neutral-100` token 而非 `gray-200`

**回归用例**:
1. 横向分隔线渲染正确（全宽，1px 高度）
2. 竖向分隔线渲染正确（全高，1px 宽度）
3. className 可覆盖背景色

---

### 2. InfoPair（源: InfoLabelValue）

**用途**: 标签-数值对展示，用于卡片指标列表

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `ReactNode` | — | 标签文本 |
| `value` | `ReactNode` | — | 数值文本 |
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | 排列方向 |
| `className` | `string` | — | 容器类名 |

**设计规范**:
- 水平: `flex items-baseline gap-sp-2`
- 垂直: `flex flex-col gap-sp-1`
- Label: `text-fs-13 text-neutral-500`
- Value: `text-fs-13 text-neutral-900 font-medium`

**回归用例**:
1. 水平排列 label 和 value 正确显示
2. 垂直排列 label 在上 value 在下
3. 自定义 className 生效
4. ReactNode 类型的 label/value 正确渲染

---

### 3. OverviewSection（源: ModuleOverviewSection）

**用途**: 模块概览区段标题，带描述和右侧附加信息

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `ReactNode` | **required** | 区段标题 |
| `description` | `ReactNode` | — | 描述文案 |
| `extra` | `ReactNode` | — | 右侧附加内容 |
| `children` | `ReactNode` | — | 下方内容区域 |
| `className` | `string` | — | 容器类名 |

**设计规范**:
- Title: `text-fs-18 font-semibold text-neutral-900`
- Description: `text-fs-14 text-neutral-500`
- Extra: `text-fs-12 text-neutral-400`
- 间距: `mb-sp-5` between header and children

**回归用例**:
1. 标题正确渲染
2. 描述文案显示在标题下方
3. extra 内容右对齐
4. children 内容正确渲染
5. 无描述时布局正确
6. 无 extra 时布局正确

---

### 4. KpiCardGrid

**用途**: KPI 卡片响应式网格布局容器

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `1 \| 2 \| 3 \| 4` | `4` | 最大列数 |
| `children` | `ReactNode` | **required** | 卡片内容 |
| `className` | `string` | — | 容器类名 |

**设计规范**:
- 网格: `grid gap-sp-4`
- 响应式断点:
  - 1 列: `grid-cols-1`
  - 2 列: `sm:grid-cols-2`
  - 3 列: `lg:grid-cols-3`
  - 4 列: `xl:grid-cols-4`
- `items-stretch` 保持等高

**回归用例**:
1. 4 列布局在大屏正确显示
2. 响应式断点正确折叠
3. 子卡片等高对齐
4. columns=2 时最大 2 列
5. 自定义 className 生效

---

### 5. SegmentedBar（源: SegmentedBarChart）

**用途**: 水平堆叠比例条，展示占比分布

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `SegmentItem[]` | **required** | 数据段列表 |
| `height` | `number` | `24` | 条形高度(px) |
| `rounded` | `boolean` | `false` | 是否圆角 |
| `className` | `string` | — | 容器类名 |

```typescript
interface SegmentItem {
  label: string;
  value: number;
  color: string;       // Tailwind bg class 或 CSS 颜色值
  renderTooltip?: (item: SegmentItem, percentage: string, total: number) => ReactNode;
}
```

**设计规范**:
- 容器: `flex w-full overflow-hidden`
- 圆角模式: `rounded-full`
- 最小宽度保底: 3% (小比例仍可见)
- 文字: `text-fs-11 text-neutral-0 font-medium`
- Hover: `opacity-80` 过渡效果

**回归用例**:
1. 各段按比例正确渲染宽度
2. 颜色正确应用
3. 圆角模式正确
4. 小比例（<3%）仍然可见
5. 0 值段不渲染
6. 总和为 0 时不渲染

---

### 6. Alert

**用途**: 信息提示条，支持多语义变体和关闭按钮

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'info' \| 'success' \| 'warning' \| 'danger'` | `'info'` | 语义变体 |
| `icon` | `ReactNode` | — | 左侧图标插槽 |
| `closable` | `boolean` | `false` | 是否可关闭 |
| `onClose` | `() => void` | — | 关闭回调 |
| `children` | `ReactNode` | **required** | 消息内容 |
| `className` | `string` | — | 容器类名 |

**设计规范**:
- 使用与 Callout 相同的语义色系统:
  - info: `bg-info-bg border-info-border text-info-700`
  - success: `bg-success-bg border-success-border text-success-700`
  - warning: `bg-warning-bg border-warning-border text-warning-700`
  - danger: `bg-danger-bg border-danger-border text-danger-700`
- 圆角: `rounded-lg`
- 内边距: `px-sp-4 py-sp-3`
- Icon: `w-4 h-4`, 对应语义色
- 关闭按钮: `text-neutral-400 hover:text-neutral-700`
- 与 Callout 的区别: Alert 有边框 + 可关闭；Callout 无边框、用于内嵌信息

**回归用例**:
1. 四种变体颜色正确
2. 图标显示在左侧
3. 关闭按钮可见且可点击
4. 点击关闭按钮触发 onClose
5. 无图标时布局正确
6. 不可关闭时无关闭按钮

---

## 迭代计划

### Phase 1（本次 PR）

实现顺序（按依赖关系）:
1. `Divider` — 无依赖，最简单
2. `InfoPair` — 无依赖
3. `Alert` — 无依赖，与 Callout 同级
4. `OverviewSection` — 无依赖
5. `KpiCardGrid` — 无依赖
6. `SegmentedBar` — 无依赖

每个组件包含:
- `.tsx` 组件文件
- `.stories.tsx` Storybook 故事
- 在 `index.ts` 中导出

### Phase 2（后续 PR）

- 前端仓库中的 LineGap → 替换为 `import { Divider } from '@datarise/design-system'`
- 前端仓库中的 InfoLabelValue → 替换为 `import { InfoPair } from '@datarise/design-system'`
- 同理替换其他组件

---

## 回归计划

### 自动化

1. **Storybook 视觉检查**: 每个组件的 stories 覆盖所有变体/状态
2. **浏览器回归**: 通过 Chrome 自动化打开 Storybook，逐一验证组件渲染

### 手动检查清单

- [ ] 所有组件使用 design token（无 hardcoded 色值）
- [ ] 所有组件 Tailwind-only（无 standalone CSS）
- [ ] 所有组件正确导出（index.ts barrel export）
- [ ] Storybook 构建无错误
- [ ] 组件 API 与 spec 一致
