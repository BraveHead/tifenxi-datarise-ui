# Make 设计系统 · React 组件

基于「满意度分析」模块提炼的全局规范产出。两套实现任选其一：

## 1. `react-css/` — React + 原生 CSS（推荐）

配合项目里的 `tokens.css` + `components.css` 全局引入即可。组件仅负责结构 + 状态，样式完全走 token。

```tsx
import { Button } from '@/components/Button';

<Button variant="primary" onClick={submit}>保存</Button>
<Button variant="default" size="sm">取消</Button>
<Button variant="ghost" iconLeft={<Icon />}>编辑</Button>
<Button variant="danger" loading>删除中</Button>
<Button block size="lg">下一步</Button>
```

**Props 速查**

| prop | 类型 | 默认 | 说明 |
|---|---|---|---|
| `variant` | `'primary' \| 'default' \| 'ghost' \| 'danger'` | `default` | 视觉变体 |
| `size` | `'sm' \| 'md' \| 'lg'` | `md` | 28 / 32 / 40px 高 |
| `block` | `boolean` | `false` | 占满容器宽度 |
| `disabled` | `boolean` | `false` | 禁用态 |
| `loading` | `boolean` | `false` | 加载态（自动 disabled + 左侧 spinner） |
| `iconLeft` / `iconRight` | `ReactNode` | — | 左右图标槽位 |

## 2. `react-tailwind/` — React + Tailwind

先把 `tailwind.config.snippet.js` 中的 `brand/neutral/danger` 色阶合并到你的 `tailwind.config`，然后直接引用 `Button.tsx`。API 与 CSS 版完全一致。

## 规范摘要

- **只有一个主操作**：同区域内 `primary` 最多一个，其余一律用 `default` / `ghost`
- **破坏性操作用 `danger`**：且需要二次确认（Modal / Popconfirm）
- **sm / md / lg 绑定容器密度**：表格行内 = sm；表单主操作 = md；抽屉底部固定条 / 空状态 CTA = lg
- **loading 期间不允许再次点击**：组件已内置 `disabled || loading` 保护
- **禁用 emoji 作为按钮图标**：使用 14px stroke 图标（`iconLeft` 槽位）
