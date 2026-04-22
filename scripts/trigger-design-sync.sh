#!/usr/bin/env bash
# 触发 Claude Design → GitHub 同步
# 用法: ./scripts/trigger-design-sync.sh <manifest_url>

set -euo pipefail

MANIFEST_URL="${1:?用法: $0 <manifest_url>}"
REPO="BraveHead/tifenxi-datarise-ui"

echo "Triggering design sync..."
echo "  Manifest: $MANIFEST_URL"

gh api "repos/$REPO/dispatches" \
  -X POST \
  -f event_type=claude-design-sync \
  -f "client_payload[manifest_url]=$MANIFEST_URL"

echo "Done. Check https://github.com/$REPO/actions for progress."
