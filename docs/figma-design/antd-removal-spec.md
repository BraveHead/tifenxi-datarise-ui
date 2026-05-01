# AntD 依赖移除计划 Spec

> **目标**：将 `antd` 和 `@ant-design/icons` 从组件库的依赖中完全移除，所有组件改为纯自研实现（Tailwind + CSS 变量 + Headless 方案）。
>
> **创建日期**：2026-05-01

---

## 1. 当前 AntD 依赖全景

### 1.1 依赖入口分类

| 分类 | 来源 | 数量 | 说明 |
|------|------|------|------|
| **index.ts 直接透传** | `export { Input, Checkbox, Calendar } from 'antd'` | 3 | 无任何封装，直接暴露 AntD 组件 |
| **WRAPPED 薄封装** | `wrapped/` 目录下的 9 个组件 | 9 | 包裹 AntD 组件，少量自定义 |
| **COMMON 中依赖** | `Popover` | 1 | 包裹 AntD Popover |
| **Icons 透传** | `@ant-design/icons` 的 60+ 图标 | 60+ | 纯 re-export |
| **Provider** | `TifenxiProvider` 包裹 `ConfigProvider` | 1 | 暗色主题桥梁 |
| **合计** | — | **74+** | — |

### 1.2 各组件复杂度

| 组件 | 复杂度 | AntD API 使用面 | 自研难度 |
|------|--------|----------------|---------|
| **Input** | 直接透传 | value/onChange/placeholder/disabled/error/prefix/suffix/addonBefore/addonAfter | 🟡 中 — 已有自研 Input，需补 Checkbox/Calendar |
| **Checkbox** | 直接透传 | checked/onChange/disabled/indeterminate | 🟢 低 — 简单受控组件 |
| **Calendar** | 直接透传 | value/onChange/fullscreen/headerRender | 🔴 高 — 复杂日期网格 |
| **Table** | 中等封装 | columns/dataSource/pagination/scroll/rowSelection/expandable/sortOrder/onRow | 🔴 高 — 最复杂组件 |
| **Select** | 中等封装 | options/value/onChange/mode(multiple)/showSearch/filterOption/loading | 🟡 中 — 需搜索+多选+虚拟滚动 |
| **DatePicker** | 薄封装 | value/onChange/picker(date/month/year)/disabledDate/RangePicker | 🔴 高 — 日期面板+范围选择 |
| **Dropdown** | 中等封装 | menu.items/trigger/placement/open/onOpenChange | 🟢 低 — 触发层+菜单列表 |
| **Form** | 薄封装 | Form.Item(name/label/rules)/useForm/validateFields/submit | 🟡 中 — 表单验证逻辑 |
| **Progress** | 薄封装 | percent/status/type(line/circle)/size | 🟢 低 — CSS 动画圆弧/线条 |
| **Menu** | 薄封装 | items/mode(inline/vertical)/onClick/selectedKeys | 🟡 中 — 嵌套菜单+展开/收起 |
| **Breadcrumb** | 薄封装 | items[{title, href}]/separator | 🟢 低 — 简单列表+分隔符 |
| **Segmented** | 薄封装 | options/value/onChange/block | 🟢 低 — 类似已有 SegTabs |
| **Popover** | 薄封装 | content/title/trigger/placement/open | 🟢 低 — 已有 Tooltip 可复用定位逻辑 |
| **Icons** | 纯透传 | 60+ 个图标 SVG | 🟡 中 — 需建立 SVG icon 体系 |
| **ThemeProvider** | 复杂 | ConfigProvider + darkAlgorithm + 全量 token 映射 | 🟢 低 — 移除 AntD 后此文件可删 |

---

## 2. 分阶段执行计划

### Phase 0 — 前置准备

| 任务 | 说明 |
|------|------|
| 建立 SVG Icon 体系 | 从 `@ant-design/icons` 中提取 60+ 个图标 SVG，建立 `src/design-system/icons/` 自有 icon 组件 |
| 建立 Headless hooks | `usePopover`(定位)、`useSelect`(搜索+多选)、`useForm`(验证) 等基础 hook |

### Phase 1 — 简单组件替换（🟢 低难度）

**目标**：替换 6 个简单组件，消除约 40% 的 AntD import。

| 组件 | 自研方案 | 预计行数 | 依赖 |
|------|---------|---------|------|
| **Checkbox** | `<input type="checkbox">` + Tailwind 样式 + 受控 props | ~40 行 | 无 |
| **Breadcrumb** | `<nav>` + `<ol>` + separator + Tailwind | ~30 行 | 无 |
| **Segmented** | 复用已有 `SegTabs` 组件逻辑，适配 `options` prop API | ~50 行 | 无 |
| **Progress** | `<div>` + CSS width%/conic-gradient + 动画 | ~80 行 | 无 |
| **Popover** | 复用已有 `Tooltip` 的定位引擎，增加 title/content 插槽 | ~60 行 | Tooltip |
| **Dropdown** | Popover + Menu list，trigger 事件处理 | ~80 行 | Popover |

### Phase 2 — 中等组件替换（🟡 中难度）

| 组件 | 自研方案 | 预计行数 | 关键挑战 |
|------|---------|---------|---------|
| **Select** | Popover + 虚拟列表 + 搜索过滤 + 多选 Tag | ~250 行 | 虚拟滚动性能、键盘导航 |
| **Menu** | 递归 `<ul>/<li>` + 展开/收起状态 + 嵌套选中 | ~200 行 | 嵌套层级管理 |
| **Form + FormItem** | Context + 受控字段注册 + 规则验证 + 错误展示 | ~300 行 | 异步验证、动态字段 |
| **Icons** | 60+ 个 SVG 组件，统一 `<Icon>` wrapper，支持 size/color/spin | ~100 行 wrapper + SVG 文件 | 批量迁移 |

### Phase 3 — 复杂组件替换（🔴 高难度）

| 组件 | 自研方案 | 预计行数 | 关键挑战 |
|------|---------|---------|---------|
| **Table** | `<table>` + 虚拟滚动 + 排序 + 分页 + 行选择 + 列固定 | ~500 行 | 虚拟滚动、固定列 sticky、性能 |
| **DatePicker** | 日历面板 + 日期计算 + 范围选择 + Popover | ~400 行 | 日期逻辑、范围选择交互、国际化 |
| **Calendar** | 月/年视图网格 + 日期标记 | ~300 行 | 复用 DatePicker 日历面板 |

### Phase 4 — ThemeProvider 移除

AntD 全部替换完成后：
- 删除 `ThemeProvider.tsx` 中的 `ConfigProvider` / `darkAlgorithm`
- `TifenxiProvider` 简化为纯 CSS 变量注入（locale 等功能用自有 Context）
- 从 `package.json` 移除 `antd` 和 `@ant-design/icons` 依赖

---

## 3. API 兼容策略

### 3.1 Props 对齐原则

自研组件必须**向后兼容**现有 API，避免前端消费侧大面积修改：

```typescript
// 现有 API（AntD 透传）
<Select options={opts} value={val} onChange={setVal} showSearch />

// 自研替换后：保持相同 API
<Select options={opts} value={val} onChange={setVal} showSearch />
```

### 3.2 类型导出兼容

每个替换组件必须导出与原 AntD 相同名称的类型：

```typescript
// 替换前：export type { SelectProps } from 'antd';
// 替换后：export type { SelectProps } from './components/common/Select/Select';
// ↑ 自定义 SelectProps 类型，兼容 AntD SelectProps 的核心子集
```

### 3.3 不需要兼容的 AntD 特性

以下 AntD 特性在项目中**未使用**，自研时可忽略：

| 特性 | 说明 |
|------|------|
| Table 虚拟滚动 (`virtual`) | 项目表格数据量 < 1000 行 |
| Table 树形数据 (`expandable.childrenColumnName`) | 未使用 |
| Select 远程搜索 (`onSearch` + 异步 options) | 项目均为本地 options |
| Form 复杂布局 (`labelCol`/`wrapperCol`) | 项目均用默认布局 |
| DatePicker 国际化 (`locale`) | 固定中文 |
| Calendar 全屏模式 | 未使用 |

---

## 4. 回归测试矩阵

### Phase 1 回归点

| 组件 | 测试点 | 验证方式 |
|------|--------|---------|
| Checkbox | checked/unchecked/disabled/indeterminate 四态 | Storybook + vitest |
| Breadcrumb | 多层级渲染、separator、点击导航 | Storybook + vitest |
| Segmented | 选中切换、block 模式、disabled 项 | Storybook + vitest |
| Progress | line/circle 类型、percent 动画、status 颜色 | Storybook |
| Popover | trigger(hover/click)、placement 12 方向、受控 open | Storybook + vitest |
| Dropdown | menu items 渲染、trigger 触发、键盘导航 | Storybook + vitest |

### Phase 2 回归点

| 组件 | 测试点 |
|------|--------|
| Select | 单选/多选/搜索过滤/清除/disabled/empty state/键盘导航 |
| Menu | inline/vertical 模式、嵌套展开、选中高亮、divider |
| Form | 必填验证、正则验证、提交/重置、错误展示、动态字段 |
| Icons | 60+ 图标渲染正确、size/color props、spin 动画 |

### Phase 3 回归点

| 组件 | 测试点 |
|------|--------|
| Table | columns 渲染、排序、分页、行选择、空态、自定义 cell render、responsive |
| DatePicker | 日期选择、月/年切换、范围选择、禁用日期、清除 |
| Calendar | 月视图渲染、日期标记、header 自定义 |

### 暗色模式回归

每个自研组件完成后需在 Light/Dark 模式下验证：
- 使用 CSS 变量（`--neutral-*`, `--brand-*`, `--surface`, `--fg` 等）
- 不引入任何新的硬编码色值
- Storybook 切换 ☀️/🌙 视觉正确

---

## 5. 风险与决策

| 风险 | 缓解 |
|------|------|
| Table 功能缺失 | 限定 API 子集，只实现项目实际使用的 columns/pagination/sort/rowSelection |
| DatePicker 日期计算复杂 | 使用 `dayjs`（已是 peerDep）处理日期逻辑，只需实现 UI 面板 |
| 前端消费侧 breaking change | 严格保持 Props API 兼容，替换阶段不改 index.ts 的导出签名 |
| Icons 批量迁移 | 脚本提取 @ant-design/icons 的 SVG path data，自动生成组件 |
| 包体积可能增大 | 自研组件按需导出，tree-shaking 友好；AntD 移除后整体应减小 |

---

## 6. 里程碑

| 里程碑 | 内容 | 预期交付物 |
|--------|------|----------|
| **M1** | Phase 0 + Phase 1 完成 | 6 个自研组件 + Icon 体系基础 |
| **M2** | Phase 2 完成 | Select/Menu/Form/Icons 自研 |
| **M3** | Phase 3 完成 | Table/DatePicker/Calendar 自研 |
| **M4** | Phase 4 — AntD 移除 | `package.json` 无 antd 依赖，ThemeProvider 简化 |
