# GIO Design 字体对齐 Spec

> **迭代目标**：将 tifenxi-datarise-ui 组件库的字体 Token 对齐至 GIO Design 字体规范（Fonts Guide），涵盖字体族、字号、行高、字重四个维度。
>
> **Figma 源**：[GIO-Design-new / Fonts](https://www.figma.com/design/ER7Me40aWi8rdBm7VQN6C8/GIO-Design-new?node-id=0-1)
>
> **创建日期**：2026-05-01

---

## 1. 变更范围

### 1.1 文件清单

| 文件 | 变更类型 | 说明 |
|------|---------|------|
| `src/design-system/tokens.css` | 改值 + 新增 | 字体 token 源头，全量对齐 GIO Font Guide |
| `src/design-system/styles.css` | 新增映射 | @theme inline 补充新增字号/行高/字重 token |

### 1.2 不在本次范围

- 前端 `ti-datarise-frontend` 消费侧适配（保持向后兼容，无需同步修改）
- Storybook story 更新
- 组件内部用法变更（组件仍使用旧 token 名，不破坏）

---

## 2. GIO Design 字体规范（来源：Figma Fonts Guide）

### 2.1 字体族

| 用途 | 字体 | 适用场景 |
|------|------|---------|
| 中文 (CN) | **PingFang SC** | 所有中文文本 |
| 英文 (EN) | **Nunito Sans** | 所有英文/拉丁文本 |
| 数字 (Num) | **D-DIN Bold** | 关键指标数字、数据展示 |

### 2.2 字号 + 行高体系

GIO Design 使用固定 px 行高（非比例），规律为 `font-size + 8px`（12-24px 区间）。

**Regular (400) / Medium (500) — CN & EN 共用字号行高：**

| 字号 | 行高 | 语义 | GIO 标签 |
|------|------|------|---------|
| 10px | 18px | 最小文本 | 最小文本 (EN only) |
| 12px | 20px | 辅助文案 | 辅助文案/次要文案/水印文本 |
| 14px | 22px | 正文-常规 | 正文-常规 / 正文/标题-小 |
| 14px | 21px | 正文-段落 | 14/CN段落-Regular（1.5 比例） |
| 16px | 24px | 标题-中 | 标题-中 |
| 18px | 26px | 标题-大 | 标题-大 |
| 20px | 28px | 运营标题-小 | 运营标题-小 |
| 24px | 32px | 运营标题-中 | 运营标题-中 |
| 36px | 44px | 运营标题-大 | 运营标题-大 |
| 48px | 56px | 特殊场景-小 | 特殊场景-小 |
| 56px | 64px | 特殊场景-大 | 特殊场景-大 |

**Bold (700) — EN 文本 & D-DIN 数字：**

| 字号 | 行高 | 字体 | 备注 |
|------|------|------|------|
| 12px | 12px | D-DIN | 紧凑数字 |
| 14px | — | D-DIN / Nunito Sans | 正文加粗 |
| 16px | — | D-DIN | |
| 18px | — | D-DIN | |
| 20px | — | D-DIN | |
| 24px | — | D-DIN | |
| 32px | — | D-DIN | |
| 36px | — | D-DIN | |
| 48px | — | D-DIN | |

### 2.3 字重

| 字重值 | 名称 | GIO 使用 |
|--------|------|---------|
| 400 | Regular | CN/EN 正文 |
| 500 | Medium | CN/EN 标题/强调 |
| 700 | Bold | EN 加粗、D-DIN 数字 |

---

## 3. Token 变更明细

### 3.1 字体族

| Token | 当前值 | 新值 | 动作 |
|-------|--------|------|------|
| `--font-sans` | `"Nunito Sans", -apple-system, ...` | 不变 | 已包含 Nunito Sans + PingFang SC |
| `--font-mono` | `ui-monospace, ...` | 不变 | — |
| `--font-num` | `"Nunito Sans", -apple-system, ...` | `"D-DIN", "Nunito Sans", -apple-system, "Helvetica Neue", sans-serif` | **改值** — D-DIN 优先，Nunito Sans fallback |

> **说明**：D-DIN 字体文件已在前端 `index.css` 中通过 `@font-face` 加载（D-DIN-Bold.otf）。组件库 `styles.css` 已通过 Google Fonts 加载 Nunito Sans。

### 3.2 字号

| Token | 当前值 | 新值 | 动作 |
|-------|--------|------|------|
| `--fs-11` | 11px | 不变 | 保留（业务场景需要） |
| `--fs-12` | 12px | 不变 | — |
| `--fs-13` | 13px | 不变 | 保留（业务场景需要） |
| `--fs-14` | 14px | 不变 | — |
| `--fs-16` | 16px | 不变 | — |
| `--fs-18` | 18px | 不变 | — |
| `--fs-20` | 20px | 不变 | — |
| `--fs-24` | 24px | 不变 | — |
| `--fs-32` | 32px | 不变 | — |
| `--fs-36` | — | `36px` | **新增** — 运营标题-大 |
| `--fs-48` | — | `48px` | **新增** — 特殊场景-小 |
| `--fs-56` | — | `56px` | **新增** — 特殊场景-大 |

### 3.3 行高

**策略**：保留旧的比例行高 token（`--lh-tight/base/loose`）保持向后兼容，新增按字号绑定的固定 px 行高 token。

| Token | 值 | 动作 | 说明 |
|-------|----|----|------|
| `--lh-tight` | 1.25 | **保留** | 向后兼容 |
| `--lh-base` | 1.5 | **保留** | 向后兼容 |
| `--lh-loose` | 1.7 | **保留** | 向后兼容 |
| `--lh-12` | `20px` | **新增** | 12px 字号行高 |
| `--lh-14` | `22px` | **新增** | 14px 字号行高 |
| `--lh-16` | `24px` | **新增** | 16px 字号行高 |
| `--lh-18` | `26px` | **新增** | 18px 字号行高 |
| `--lh-20` | `28px` | **新增** | 20px 字号行高 |
| `--lh-24` | `32px` | **新增** | 24px 字号行高 |
| `--lh-32` | `40px` | **新增** | 32px 字号行高 |
| `--lh-36` | `44px` | **新增** | 36px 字号行高 |
| `--lh-48` | `56px` | **新增** | 48px 字号行高 |
| `--lh-56` | `64px` | **新增** | 56px 字号行高 |

> **32px 行高说明**：GIO Fonts Guide 未明确标注 32px 行高。按 `fs + 8px` 规律推算为 40px。

### 3.4 字重

| Token | 当前值 | 新值 | 动作 |
|-------|--------|------|------|
| `--fw-regular` | 400 | 不变 | — |
| `--fw-medium` | 500 | 不变 | — |
| `--fw-semibold` | 600 | **保留** | GIO 无此字重，但业务中已使用，保持兼容 |
| `--fw-bold` | — | `700` | **新增** — D-DIN 数字、EN 加粗 |

### 3.5 Tailwind 映射（styles.css @theme inline）

新增以下映射：

```css
/* Font Size 新增 */
--text-fs-36: var(--fs-36);
--text-fs-48: var(--fs-48);
--text-fs-56: var(--fs-56);

/* Leading / Line Height — 按字号绑定（用法：leading-12、leading-14） */
--leading-12: var(--lh-12);
--leading-14: var(--lh-14);
--leading-16: var(--lh-16);
--leading-18: var(--lh-18);
--leading-20: var(--lh-20);
--leading-24: var(--lh-24);
--leading-32: var(--lh-32);
--leading-36: var(--lh-36);
--leading-48: var(--lh-48);
--leading-56: var(--lh-56);

/* Font Weight 新增 */
--font-weight-bold: var(--fw-bold);
```

---

## 4. 向后兼容性

| 项目 | 影响 | 说明 |
|------|------|------|
| `--lh-tight/base/loose` | 无影响 | 保留不删，现有引用不破坏 |
| `--fw-semibold` | 无影响 | 保留不删 |
| `--fs-11/13` | 无影响 | 保留不删，GIO 未定义但业务需要 |
| `--font-num` 改值 | **低风险** | D-DIN 已在前端加载；未加载时 fallback 到 Nunito Sans |
| `leading-tight/base/loose` | 无影响 | Tailwind 类名保留 |
| `.num` 类 | 自动跟随 `--font-num` 变更 | D-DIN 生效 |

---

## 5. 执行阶段

### Phase 1 — tokens.css 字体 token 对齐

- 修改 `--font-num`
- 新增 `--fs-36/48/56`
- 新增 `--lh-12` ~ `--lh-56`
- 新增 `--fw-bold`

### Phase 2 — styles.css Tailwind 映射

- 新增字号映射 `--text-fs-36/48/56`
- 新增行高映射 `--leading-12` ~ `--leading-56`
- 新增字重映射 `--font-weight-bold`

---

## 6. 回归测试清单

### 6.1 字体族

- [ ] **`.num` 类元素**：数字渲染为 D-DIN Bold（如 KpiCard 指标数字）
- [ ] **DeltaBadge**：delta 数字使用 `font-num` → 显示为 D-DIN
- [ ] **英文文本**：Nunito Sans 正常渲染（无变化）
- [ ] **中文文本**：PingFang SC 正常渲染（无变化）
- [ ] **Fallback**：未加载 D-DIN 时，数字回退到 Nunito Sans

### 6.2 字号

- [ ] **text-fs-12**：12px 正常
- [ ] **text-fs-14**：14px 正常（默认正文）
- [ ] **text-fs-16**：16px 正常
- [ ] **text-fs-18**：18px 正常
- [ ] **text-fs-20**：20px 正常
- [ ] **text-fs-24**：24px 正常
- [ ] **text-fs-32**：32px 正常
- [ ] **text-fs-36**：36px 新增 — 可用且渲染正确
- [ ] **text-fs-48**：48px 新增 — 可用且渲染正确
- [ ] **text-fs-56**：56px 新增 — 可用且渲染正确

### 6.3 行高

- [ ] **leading-tight**：旧 token 1.25 仍生效（向后兼容）
- [ ] **leading-base**：旧 token 1.5 仍生效
- [ ] **leading-loose**：旧 token 1.7 仍生效
- [ ] **leading-12**：20px 生效
- [ ] **leading-14**：22px 生效
- [ ] **leading-16**：24px 生效
- [ ] **leading-18**：26px 生效
- [ ] **leading-20**：28px 生效
- [ ] **leading-24**：32px 生效
- [ ] **leading-32**：40px 生效
- [ ] **leading-36**：44px 生效
- [ ] **leading-48**：56px 生效
- [ ] **leading-56**：64px 生效

### 6.4 字重

- [ ] **font-regular**：400 正常
- [ ] **font-medium**：500 正常
- [ ] **font-semibold**：600 正常（向后兼容）
- [ ] **font-bold**：700 新增 — 可用且渲染正确

### 6.5 组合场景

- [ ] **KpiCard 指标数字**：D-DIN Bold + text-fs-24 + leading-24 (32px)
- [ ] **OverviewSection 标题**：text-fs-18 + leading-18 (26px) + font-semibold
- [ ] **Tooltip 内容**：text-fs-12 + leading-12 (20px)
- [ ] **body 默认**：text-fs-14 + lh-base (1.5) 无变化
- [ ] **Storybook 全量构建**：`yarn build` 无报错
