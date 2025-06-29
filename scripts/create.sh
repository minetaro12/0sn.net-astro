#!/usr/bin/env bash
# 新しいマークダウン記事を content/posts/YYYYMMDD/slug/index.md に作成するスクリプト
# 使い方: ./scripts/create.sh 20250629 my-article-title


set -e

# 引数が1つ（slugのみ）の場合は今日の日付を使う
if [ $# -eq 1 ]; then
  DATE=$(date +%Y%m%d)
  SLUG="$1"
elif [ $# -eq 2 ]; then
  DATE="$1"
  SLUG="$2"
else
  echo "Usage: $0 [YYYYMMDD] <slug>"
  echo "       $0 <slug>  # 日付省略時は今日"
  exit 1
fi

POST_DIR="content/posts/$DATE/$SLUG"
MD_FILE="$POST_DIR/index.md"

if [ -e "$MD_FILE" ]; then
  echo "Error: $MD_FILE already exists."
  exit 1
fi

mkdir -p "$POST_DIR"


cat <<EOF > "$MD_FILE"
---
title: ""
date: $(date -u +%Y-%m-%dT%H:%M:%SZ)
tags: []
comments: true
showToc: true
---

## 記事タイトル

ここに本文を書きます。
EOF

echo "Created $MD_FILE"
