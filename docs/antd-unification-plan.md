# AntD 统一迁移方案 — 前端单一入口计划

> 目标：前端 `ti-datarise-frontend` 不再直接 `import { ... } from 'antd'`，所有组件统一从 `tifenxi-design` 导入。
> 策略：路线 B — tifenxi 原生 + AntD 薄封装共存，对外统一 API。

---

## 1. 现状盘点

### 1.1 tifenxi-design 已有组件 (26 个)

| 类型 | 组件 |
|------|------|
| Common (20) | Button, Input, Tag, Callout, Tabs, SegTabs, DeltaBadge, EmptyState, SectionTitle, DrawerShell, Divider, InfoPair, Alert, Spinner, Skeleton, OverviewSection, KpiCardGrid, SegmentedBar, Tooltip, Drawer, Modal, toast |
| Business (3) | KpiCard, InsightCard, ActionCard |
| Charts (3) | TrendSparkline, QuadrantScatterChart, StackedBarChart |

### 1.2 前端仍在使用的 AntD 组件 (31 个，105+ 文件)

| AntD 组件 | 文件数 | 使用场景 |
|-----------|--------|---------|
| Button | 15 | 各页面按钮 |
| Tag | 13 | 状态标签、标记 |
| Empty | 12 | 空数据占位 |
| Typography (Text/Title) | 12 | 文本样式 |
| Table + ColumnsType | 10 | 管理后台列表 + 业务表格 |
| ConfigProvider | 8 | AntD 主题注入 |
| Dropdown | 6 | 下拉菜单 |
| Card | 5 | 卡片容器 |
| Progress | 4 | 进度条 |
| Form + Input (表单场景) | 3 | 登录/密码修改 |
| Menu + MenuProps | 2 | 侧边栏 + 用户菜单 |
| Layout + Sider | 2 | 页面布局 |
| DatePicker | 2 | 时间筛选 |
| Segmented | 2 | 分段切换 |
| Badge | 2 | 消息红点 |
| Space | 2 | 间距容器 |
| Select | 1 | 筛选下拉 |
| Breadcrumb | 1 | 面包屑 |
| Popover | 1 | 弹出气泡 |
| Calendar | 1 | 时间选择面板 |
| Avatar | 1 | 用户头像 |
| Row/Col | 1 | 栅格布局 |
| Modal.confirm | 1 | 删除确认 |
| Alert (AntD) | 2 | 提示横幅 |
| Tabs (AntD) | 1 | UsageTrend 页签 |

### 1.3 @ant-design/icons (44 个图标，60+ 文件)

高频：InfoCircleOutlined(10), ArrowUp/DownOutlined(9), RiseOutlined(4), ThunderboltOutlined(4), CalendarOutlined(3), BarChartOutlined(3), BulbOutlined(3), RocketOutlined(3), RightOutlined(3), DownOutlined(3)

低频 (1-2 次)：LockOutlined, UserOutlined, SearchOutlined, FilterOutlined, MoreOutlined, AimOutlined, TeamOutlined, etc.

---

## 2. 分层迁移策略

### Tier 1: 前端直接替换 — tifenxi 已有等价组件

> 改动范围：仅 `ti-datarise-frontend`，UI 库不需要改动。

| AntD | tifenxi 等价 | 文件数 | Props 适配要点 |
|------|-------------|--------|---------------|
| Button | Button | 15 | `type="primary"` → `variant="primary"`, `type="link/text"` → `variant="ghost"`, `danger` → `variant="danger"` (需新增), `icon` prop 保持, `loading/disabled` 已有 |
| Tag | Tag | 13 | `color="blue/green/red"` → `variant` 映射, `bordered` 不适用, `closable` 需验证 |
| Empty | EmptyState | 12 | `description` → `message`, `image` → `icon`, `children` 保持 |
| Alert | Alert | 2 | `type="info/warning"` → `variant`, `message` → `children`, `showIcon` 默认 true |
| Tabs | Tabs | 1 | `items=[{key,label,children}]` → tifenxi `TabItem` 格式, `onChange` 签名一致 |

**预估工作量：1.5 天**（含 prop 适配 + 回归测试）

**前提条件 — tifenxi Button 需补充：**
- [ ] `variant="danger"` — 红色主色调按钮
- [ ] `variant="link"` — 无边框纯文字按钮
- [ ] `variant="text"` — 无背景文字按钮
- [ ] `block` prop — 宽度撑满
- [ ] `icon` prop — 按钮内图标
- [ ] `htmlType` prop — form submit 支持

**前提条件 — tifenxi Tag 需补充：**
- [ ] `closable` + `onClose` — 可关闭标签
- [ ] 更多颜色 variant 映射 (blue/green/red/orange/purple)

**前提条件 — tifenxi EmptyState 需验证：**
- [ ] 是否支持 `children` 插槽（Empty 底部的操作按钮）

---

### Tier 2: Tailwind 直接替代 — 无需组件化

> 改动范围：仅 `ti-datarise-frontend`，用 Tailwind 类替换。

| AntD | 替代方案 | 文件数 | 说明 |
|------|---------|--------|------|
| Typography.Text | `<span className="text-sm text-fg-secondary">` | 12 | 按语义选择 text utility |
| Typography.Title | `<h2 className="text-lg font-semibold text-fg">` | 5 | 用 heading utility |
| Space | `<div className="flex gap-2">` | 2 | flex + gap 完全覆盖 |
| Row/Col | `<div className="grid grid-cols-3 gap-4">` | 1 | grid 替代 |
| Layout/Sider | 保持现有自定义 Layout | 2 | 已有自定义布局，仅去掉 import |

**预估工作量：0.5 天**

---

### Tier 3: tifenxi-design 新增 AntD 封装组件

> 改动范围：`tifenxi-datarise-ui` 新增组件 + `ti-datarise-frontend` 换 import。
> 封装策略：薄封装 = AntD 组件 + tifenxi Token 主题 + 内置 ConfigProvider。

#### 3.1 架构方案

```
src/design-system/
  components/
    common/          # 原生 Tailwind 组件（不变）
    business/        # 业务组件（不变）
    charts/          # 图表组件（不变）
    wrapped/         # ← 新增：AntD 薄封装组件
      Table/
        Table.tsx           # re-export AntD Table + token 主题
        Table.stories.tsx
      Select/
        Select.tsx
      ...
  providers/         # ← 新增
    ThemeProvider.tsx # 内置 ConfigProvider + token 映射
```

#### 3.2 ThemeProvider — 统一主题注入

```tsx
// src/design-system/providers/ThemeProvider.tsx
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';

const tifenxiTheme = {
  token: {
    colorPrimary: 'var(--brand-500)',
    colorSuccess: 'var(--success-500)',
    colorWarning: 'var(--warning-500)',
    colorError: 'var(--danger-500)',
    colorInfo: 'var(--info-500)',
    borderRadius: 6,
    // ... 完整映射
  },
};

export function TifenxiProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider theme={tifenxiTheme} locale={zhCN}>
      {children}
    </ConfigProvider>
  );
}
```

前端 `main.tsx` 中用 `<TifenxiProvider>` 包裹根组件，移除现有散落的 `<ConfigProvider>`。

#### 3.3 封装组件清单

| 组件 | 封装方式 | 文件数 | 优先级 | 说明 |
|------|---------|--------|--------|------|
| **Table** | 薄封装 + 类型 re-export | 10 | P0 | re-export `Table`, `ColumnsType`, 注入 empty 为 tifenxi EmptyState |
| **Dropdown** | 薄封装 | 6 | P0 | re-export + 下拉菜单样式覆盖 |
| **Card** | **自建** (Tailwind) | 5 | P1 | AntD Card 功能简单，用 Tailwind 自建更轻量 |
| **Progress** | 薄封装 | 4 | P1 | re-export + 颜色 token 化 |
| **Form** | 薄封装 + re-export | 3 | P1 | Form + Form.Item + 校验规则透传 |
| **Select** | 薄封装 | 1 | P1 | re-export + 下拉样式覆盖 |
| **DatePicker** | 薄封装 | 2 | P1 | RangePicker 一并封装 |
| **Menu** | 薄封装 | 2 | P2 | 侧边栏菜单 |
| **Segmented** | 评估 SegTabs 覆盖 | 2 | P2 | 若 SegTabs 可覆盖则不封装 |
| **Badge** | **自建** (Tailwind) | 2 | P2 | 红点指示器，Tailwind 几行搞定 |
| **Avatar** | **自建** (Tailwind) | 1 | P2 | 头像圆形 + 首字母/图片 |
| **Breadcrumb** | 薄封装 | 1 | P2 | 面包屑导航 |
| **Popover** | **自建** (floating-ui) | 1 | P2 | 已有 Tooltip 基础，共用 floating-ui |
| **Calendar** | 随 DatePicker 封装 | 1 | P2 | 不单独封装 |
| **Modal.confirm** | **自建** 静态方法 | 1 | P2 | 基于 tifenxi Modal + ReactDOM.createRoot |

**预估工作量：4-5 天**

#### 3.4 薄封装示例 (Table)

```tsx
// src/design-system/components/wrapped/Table/Table.tsx
import { Table as AntdTable } from 'antd';
import type { TableProps as AntdTableProps } from 'antd';
import { EmptyState } from '../../common/EmptyState/EmptyState';

export type { ColumnsType } from 'antd/es/table';

export interface TableProps<T = any> extends AntdTableProps<T> {}

export function Table<T extends Record<string, any>>(props: TableProps<T>) {
  return (
    <AntdTable<T>
      locale={{ emptyText: <EmptyState message="暂无数据" /> }}
      {...props}
    />
  );
}
```

---

### Tier 4: 图标体系

> 44 个图标，60+ 文件。

#### 方案选择

| 方案 | 优点 | 缺点 |
|------|------|------|
| A: tifenxi re-export @ant-design/icons | 最快，零风险 | 仍耦合 AntD 图标包 |
| B: 内置 SVG 图标组件 | 完全解耦，可 tree-shake | 需手动维护 44+ SVG |
| C: 迁移到 lucide-react | 主流库，MIT，丰富 | 图标样式与 AntD 有差异 |

**建议方案：A（短期）→ B（长期）**

短期：在 tifenxi-design 中创建 `icons/` 目录，re-export 常用图标：

```tsx
// src/design-system/icons/index.ts
export {
  InfoCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  // ... 44 个
} from '@ant-design/icons';
```

长期：逐步替换为内置 SVG Icon 组件，按使用频率分批迁移。

**预估工作量：0.5 天 (re-export) + 后续渐进替换**

---

## 3. 依赖变更

### tifenxi-datarise-ui/package.json

```diff
  "peerDependencies": {
    "@antv/g2": "^5.0.0",
+   "antd": "^6.0.0",
+   "@ant-design/icons": "^5.0.0",
    "dayjs": "^1.11.0",
    "framer-motion": "^12.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
```

### vite.config.ts

```diff
  rollupOptions: {
    external: [
      'react', 'react-dom',
      'framer-motion', '@antv/g2', 'dayjs',
+     'antd', '@ant-design/icons',
+     /^antd\//,
+     /^@ant-design\//,
    ],
  },
```

### ti-datarise-frontend — 最终目标

```diff
- import { Button, Table, Tag } from 'antd';
- import { InfoCircleOutlined } from '@ant-design/icons';
+ import { Button, Table, Tag, InfoCircleOutlined } from 'tifenxi-design';
```

前端 `antd` 依赖保留（作为 tifenxi-design 的 peerDependency 消费），但**源码中不再直接 import**。

---

## 4. 实施计划

### Phase 1: UI 库基础设施 (1 天)

- [ ] `antd` + `@ant-design/icons` 加入 peerDependencies
- [ ] vite.config.ts 添加 external
- [ ] 创建 `components/wrapped/` 目录结构
- [ ] 创建 `providers/ThemeProvider.tsx`
- [ ] 创建 `icons/index.ts` re-export

### Phase 2: P0 封装组件 (2 天)

- [ ] Table 封装 + stories + 类型导出
- [ ] Dropdown 封装 + stories
- [ ] 补全 Button variants (danger/link/text/block/icon)
- [ ] 补全 Tag variants (closable + 更多颜色)
- [ ] EmptyState 验证 children 插槽

### Phase 3: P1 封装组件 (2 天)

- [ ] Card 自建 (Tailwind)
- [ ] Progress 封装
- [ ] Form + Form.Item 封装
- [ ] Select 封装
- [ ] DatePicker + RangePicker 封装
- [ ] Input.Password 扩展

### Phase 4: P2 封装组件 (1 天)

- [ ] Badge 自建
- [ ] Avatar 自建
- [ ] Menu 封装
- [ ] Breadcrumb 封装
- [ ] Popover 自建 (基于 floating-ui)
- [ ] Segmented 评估 (SegTabs 能否覆盖)
- [ ] Modal.confirm 静态方法自建

### Phase 5: 前端迁移 (3-4 天)

- [ ] Tier 1: Button/Tag/Empty/Alert/Tabs 替换 (~43 文件)
- [ ] Tier 2: Typography/Space/Row/Col 替换 (~17 文件)
- [ ] Tier 3: Table/Dropdown/Form 等换 import 源 (~30 文件)
- [ ] Tier 4: @ant-design/icons 换 import 源 (~60 文件)
- [ ] 移除前端散落的 ConfigProvider，统一用 TifenxiProvider
- [ ] 移除 `src/theme/themeVariables.ts`
- [ ] 验证 `yarn build` + `yarn lint` + 全页面回归

### Phase 6: 清理 & 验收 (1 天)

- [ ] ESLint 规则：禁止直接 `import from 'antd'`
- [ ] 确认 bundle size 无异常增长
- [ ] 更新 CLAUDE.md 和 docs/features.md
- [ ] 全页面视觉回归（复用 design-system-regression-spec.md）

---

## 5. 风险与应对

| 风险 | 影响 | 应对 |
|------|------|------|
| AntD ConfigProvider CSS 变量不支持 `var()` 作为 token 值 | 主题不生效 | 运行时读取 CSS 变量值后传入 computed RGB |
| Table 封装后 antd 内部样式丢失 | 表格样式异常 | 确保 antd CSS 仍被加载，封装仅做 props 透传 |
| Form.Item 与 tifenxi Input 校验集成 | 校验状态不联动 | Form 场景保持用 AntD Input，非表单场景用 tifenxi Input |
| Button icon prop 类型冲突 | TS 报错 | tifenxi Button icon 接受 ReactNode，与 AntD 一致 |
| 图标 tree-shaking 失效 | bundle 增大 | re-export 用 named export，确保 ES module 可摇树 |

---

## 6. 交付物

完成后的 tifenxi-design 导出结构：

```
tifenxi-design
├── 原生组件 (26 个，Tailwind-only)
│   ├── Button, Input, Tag, Alert, EmptyState, ...
│   ├── KpiCard, InsightCard, ActionCard
│   └── TrendSparkline, QuadrantScatterChart, StackedBarChart
├── AntD 封装组件 (~12 个)
│   ├── Table, Select, Form, DatePicker, Dropdown
│   ├── Menu, Breadcrumb, Progress, Segmented
│   └── Calendar
├── 自建新增组件 (~5 个)
│   ├── Card, Badge, Avatar, Popover, Modal.confirm
│   └── (Card/Badge/Avatar 为 Tailwind 自建)
├── ThemeProvider
│   └── 内置 ConfigProvider + tifenxi token 映射
├── Icons (44 个 re-export)
│   └── 短期 re-export @ant-design/icons，长期自建 SVG
└── 工具函数
    └── getChartTokens, getSeriesColor, ...
```

**总计：~43 个组件 + 44 图标 + ThemeProvider**

---

## 7. 迁移进度跟踪

| Phase | 状态 | 开始 | 完成 |
|-------|------|------|------|
| Phase 1: UI 库基础设施 | 🔲 待开始 | | |
| Phase 2: P0 封装组件 | 🔲 待开始 | | |
| Phase 3: P1 封装组件 | 🔲 待开始 | | |
| Phase 4: P2 封装组件 | 🔲 待开始 | | |
| Phase 5: 前端迁移 | 🔲 待开始 | | |
| Phase 6: 清理 & 验收 | 🔲 待开始 | | |

**总预估：10-14 天**（含回归测试）
