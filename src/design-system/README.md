# Make 设计系统 · React + Tailwind 组件

基于「满意度分析」模块提炼的全局规范产出。所有组件统一使用 **React + Tailwind v4** 实现。

## 本地开发

```bash
yarn dev    # 启动 Storybook，访问 http://localhost:6006
```

## 使用方式

```tsx
import { Button } from '@/design-system/components/Button';

<Button variant="primary" onClick={submit}>保存</Button>
<Button variant="default" size="sm">取消</Button>
<Button variant="ghost" iconLeft={<Icon />}>编辑</Button>
<Button variant="danger" loading>删除中</Button>
<Button block size="lg">下一步</Button>
```

## Token → Tailwind 映射

设计变量定义在 `tokens.css`（CSS custom properties），通过 `styles.css` 中的 `@theme inline` 映射到 Tailwind v4 utility classes：

```
tokens.css:  --brand-500: #3B82F6
styles.css:  @theme inline { --color-brand-500: var(--brand-500) }
组件中使用:   bg-brand-500、text-brand-500、border-brand-500
```

## Button Props

| prop | 类型 | 默认 | 说明 |
|---|---|---|---|
| `variant` | `'primary' \| 'default' \| 'ghost' \| 'danger'` | `default` | 视觉变体 |
| `size` | `'sm' \| 'md' \| 'lg'` | `md` | 28 / 32 / 40px 高 |
| `block` | `boolean` | `false` | 占满容器宽度 |
| `disabled` | `boolean` | `false` | 禁用态 |
| `loading` | `boolean` | `false` | 加载态（自动 disabled + 左侧 spinner） |
| `iconLeft` / `iconRight` | `ReactNode` | — | 左右图标槽位 |

## 规范摘要

- **只有一个主操作**：同区域内 `primary` 最多一个，其余用 `default` / `ghost`
- **破坏性操作用 `danger`**：且需要二次确认（Modal / Popconfirm）
- **sm / md / lg 绑定容器密度**：表格行内 = sm；表单主操作 = md；抽屉底部 / 空状态 CTA = lg
- **loading 期间不允许再次点击**：组件已内置 `disabled || loading` 保护
