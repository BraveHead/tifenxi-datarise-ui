#!/usr/bin/env bash
# 从本地 datarise-design-with-make 同步设计产物到本仓库
# 用法: ./scripts/sync-from-design.sh

set -euo pipefail

DESIGN_DIR="/Users/zhangshun/Desktop/NGIO/datarise/datarise-design-with-make"
TARGET_DIR="$(cd "$(dirname "$0")/.." && pwd)"

if [ ! -d "$DESIGN_DIR" ]; then
  echo "设计项目不存在: $DESIGN_DIR"
  exit 1
fi

echo "同步设计产物..."
echo "  源: $DESIGN_DIR"
echo "  目标: $TARGET_DIR"

# 同步 design-system 目录（只同步 tokens 和 docs，不覆盖组件代码）
if [ -d "$DESIGN_DIR/design-system" ]; then
  # tokens.css — 设计变量源
  [ -f "$DESIGN_DIR/design-system/tokens.css" ] && \
    cp "$DESIGN_DIR/design-system/tokens.css" "$TARGET_DIR/src/design-system/tokens.css" && \
    echo "  ✓ tokens.css"
fi

# 同步 docs
if [ -d "$DESIGN_DIR/docs" ]; then
  mkdir -p "$TARGET_DIR/docs"
  cp -R "$DESIGN_DIR/docs/"* "$TARGET_DIR/docs/"
  echo "  ✓ docs/"
fi

# 同步 CHANGELOG
if [ -f "$DESIGN_DIR/CHANGELOG.md" ]; then
  cp "$DESIGN_DIR/CHANGELOG.md" "$TARGET_DIR/CHANGELOG.md"
  echo "  ✓ CHANGELOG.md"
fi

echo ""
echo "同步完成。检查变更:"
echo "  cd $TARGET_DIR && git diff"
