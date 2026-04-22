# Changelog

All notable changes to the Make Design System will be documented here.

## [v1.0.0] - 2026-04-22

### Added
- **Tokens** (`design-system/tokens.css`): Brand / Neutral / Semantic 色彩、字体、间距、圆角、阴影 variables。以「满意度分析」模块为基准提炼。
- **Global components** (`design-system/components.css`): `.btn`, `.module`, `.callout`, `.seg-tabs`, `.kpi-card`, `.appshell-v2` (TopNav / SubNav / Body), `.compare-bar`, `.spec-box`, `.drawer`, states (empty / loading / error)。
- **React Button** (`design-system/react-css/Button.tsx` + `.css`): 4 variants × 3 sizes，`block` / `disabled` / `loading` / `iconLeft` / `iconRight`，forwardRef + 完整 TS 类型。
- **React Button (Tailwind)** (`design-system/react-tailwind/Button.tsx`): 同 API 的 Tailwind 版本 + `tailwind.config.snippet.js`。
- **Design System HTML spec** (`docs/design-system.html`): 离线可打开的完整规范手册，含 tokens / components / 模块定义 / AppShell 三层结构 / KPI 指标卡（右上图标徽章 + 同环比双指标 + 贴底 sparkline）/ AI 总结 & 洞察 / 行动建议 / DO & DON'T。

### Module Composition Standard
模块槽位固定顺序：`Header → KPI Row → Segment Tabs → AI 总结 → Section × N → Action List`。

### Semantic Color Rules
- 越高越好指标（满意度 / 好评率）：↑ 绿，↓ 红
- 越低越好指标（差评率 / 投诉）：↑ 红，↓ 绿
