# GIO Design 阴影对齐 Spec

> **迭代目标**：将 tifenxi-datarise-ui 组件库的阴影 Token 对齐至 GIO Design Shadow 规范。
>
> **Figma 源**：[GIO-Design-new / Shadows](https://www.figma.com/design/ER7Me40aWi8rdBm7VQN6C8/GIO-Design-new?node-id=1-372)
>
> **创建日期**：2026-05-01

---

## 1. 变更范围

### 1.1 文件清单

| 文件 | 变更类型 | 说明 |
|------|---------|------|
| `src/design-system/tokens.css` | 改值 + 新增 | 阴影 token 对齐 GIO Shadow Guide |
| `src/design-system/styles.css` | 新增映射 | @theme inline 补充新增阴影 token |

### 1.2 不在本次范围

- Inner Shadow / Drop Shadow（Tabs 组件专用，在 Tabs 组件内部实现）
- 方向阴影（$shadow1-left/right/up/down 变体，使用频率低，按需内联）
- Dark Mode 阴影适配

---

## 2. GIO Design 阴影规范（来源：Figma Shadows Page）

### 2.1 Box Shadow 三级体系

GIO Design 统一使用 `#000000` + `0.1 opacity` 基底，通过 offset-y 和 blur 区分层级：

| 级别 | 名称 | X | Y | Blur | 颜色 | CSS 值 | 使用场景 |
|------|------|---|---|------|------|--------|---------|
| 1 级 | shadow1-组件拖动 | 0 | 2 | 5 | rgba(0,0,0,0.1) | `0 2px 5px rgba(0,0,0,0.1)` | hover 态、表格/树拖动 |
| 2 级 | shadow2-一级下拉 | 0 | 4 | 10 | rgba(0,0,0,0.1) | `0 4px 10px rgba(0,0,0,0.1)` | 下拉菜单、气泡确认框、选择器 |
| 3 级 | shadow3-二级下拉 | 0 | 8 | 20 | rgba(0,0,0,0.1) | `0 8px 20px rgba(0,0,0,0.1)` | 全局提示、消息通知、弹窗 |

### 2.2 Focus Ring（Out Shadow）

| 名称 | 颜色 | CSS 值 | 使用场景 |
|------|------|--------|---------|
| out-shadow | #BFD5FF (= brand-100) | `0 0 0 2px #BFD5FF` | 输入框、选择框聚焦状态 |

### 2.3 方向阴影（参考，不纳入全局 token）

| 名称 | CSS 值 |
|------|--------|
| $shadow1-left | `-2px 0 5px rgba(0,0,0,0.1)` |
| $shadow1-right | `2px 0 5px rgba(0,0,0,0.1)` |
| $shadow1-left-up | `-2px -2px 5px rgba(0,0,0,0.1)` |
| $shadow1-right-up | `2px -2px 5px rgba(0,0,0,0.1)` |
| $shadow1-left-down | `-2px 2px 5px rgba(0,0,0,0.1)` |
| shadow-BackTop | `0 4px 10px rgba(0,0,0,0.1)`（= shadow2） |

### 2.4 Inner Shadow / Drop Shadow（Tabs 专用，参考）

用于 Tabs 组件的选中指示器，不纳入全局 token：

| 名称 | CSS 值 | 说明 |
|------|--------|------|
| Inner Shadow 1 | `inset 0 -2px 0 #165DFF` | Tab 底部 brand 指示线 |
| Inner Shadow 3 | `inset 0 -1px 0 #E5E6E8` | Tab 底部 neutral 分隔线 |
| Inner Shadow 5 | `inset -1px 0 0 #E5E6E8` | Tab 左侧 neutral 分隔线 |
| Inner Shadow 7 | `inset -2px 0 0 #165DFF` | Tab 左侧 brand 指示线 |
| Inner Shadow 9 | `inset 0 2px 0 #165DFF` | Tab 顶部 brand 指示线 |

---

## 3. Token 变更明细

### 3.1 Box Shadow 对齐

| Token | 当前值 | 新值 (GIO) | 动作 |
|-------|--------|-----------|------|
| `--shadow-none` | `none` | 不变 | — |
| `--shadow-card` | `0 1px 2px rgba(15,23,42,0.04)` | `0 2px 5px rgba(0,0,0,0.1)` | **改值** — 对齐 GIO shadow1 |
| `--shadow-pop` | `0 6px 16px -4px rgba(15,23,42,0.12), 0 2px 4px rgba(15,23,42,0.06)` | `0 4px 10px rgba(0,0,0,0.1)` | **改值** — 对齐 GIO shadow2 |
| `--shadow-modal` | `0 20px 48px -8px rgba(15,23,42,0.18)` | `0 8px 20px rgba(0,0,0,0.1)` | **改值** — 对齐 GIO shadow3 |
| `--shadow-focus` | — | `0 0 0 2px var(--brand-100)` | **新增** — GIO out-shadow (focus ring) |

### 3.2 语义映射

| 组件库 Token | GIO 名称 | 使用场景 |
|-------------|---------|---------|
| `--shadow-card` | shadow1 | 卡片悬浮、组件拖动 |
| `--shadow-pop` | shadow2 | 下拉菜单、Select、Popover |
| `--shadow-modal` | shadow3 | Modal、Toast、全局通知 |
| `--shadow-focus` | out-shadow | Input/Select 聚焦光环 |

### 3.3 Tailwind 映射（styles.css @theme inline）

新增：
```css
--shadow-focus: var(--shadow-focus);
```

### 3.4 Dark Mode 阴影同步

| Token | 当前 Dark 值 | 新值 | 动作 |
|-------|-------------|------|------|
| `--shadow-card` | `0 1px 3px rgba(0,0,0,0.3)` | `0 2px 5px rgba(0,0,0,0.25)` | **改值** — 保持 GIO 结构，加深 |
| `--shadow-pop` | `0 6px 16px -4px rgba(0,0,0,0.5), ...` | `0 4px 10px rgba(0,0,0,0.3)` | **改值** |
| `--shadow-modal` | `0 20px 48px -8px rgba(0,0,0,0.6)` | `0 8px 20px rgba(0,0,0,0.4)` | **改值** |

---

## 4. 向后兼容性

| 项目 | 影响 | 说明 |
|------|------|------|
| `--shadow-card` 改值 | **低风险** | 阴影变得更明显（从近乎不可见 0.04 → 0.1） |
| `--shadow-pop` 改值 | **中风险** | 从双层复杂阴影变为单层简洁阴影，视觉差异明显 |
| `--shadow-modal` 改值 | **中风险** | 阴影大幅减弱（offset 从 20px → 8px），弹层层级感减弱 |
| `--shadow-focus` 新增 | 无影响 | 纯新增 token |

---

## 5. 执行阶段

### Phase 1 — tokens.css 阴影 token 对齐

- 修改 `--shadow-card/pop/modal` 三个现有值
- 新增 `--shadow-focus`
- 同步 dark mode 阴影

### Phase 2 — styles.css Tailwind 映射

- 新增 `--shadow-focus` 映射

---

## 6. 回归测试清单

### 6.1 Box Shadow 三级

- [ ] **Card/卡片**：hover 状态显示 shadow1（0 2px 5px rgba(0,0,0,0.1)）
- [ ] **Dropdown/Select**：展开态显示 shadow2（0 4px 10px rgba(0,0,0,0.1)）
- [ ] **Modal/Dialog**：弹层显示 shadow3（0 8px 20px rgba(0,0,0,0.1)）
- [ ] **Toast/通知**：全局提示显示 shadow3
- [ ] **Tooltip**：悬浮提示显示 shadow-pop
- [ ] **DrawerShell**：抽屉显示 shadow-pop 或 shadow-modal

### 6.2 Focus Ring

- [ ] **Input**：聚焦时显示 brand-100 (#BFD5FF) 光环
- [ ] **Select**：聚焦时显示 focus ring
- [ ] **Textarea**：聚焦时显示 focus ring
- [ ] **Focus ring 颜色**：与 brand-100 一致

### 6.3 Dark Mode

- [ ] **Card**：深色模式下 shadow-card 加深可见
- [ ] **Modal**：深色模式下 shadow-modal 加深可见
- [ ] **Pop**：深色模式下 shadow-pop 加深可见

### 6.4 组合验证

- [ ] **Storybook 全量构建**：`yarn build` 无报错
- [ ] **阴影层级对比**：card < pop < modal 层级感清晰
- [ ] **阴影颜色一致性**：统一使用 #000000 基底（非 slate 色调）
