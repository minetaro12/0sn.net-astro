---
title: "git diffで新規ファイルを出力させる"
date: 2025-08-29T15:12:57Z
tags: ["git"]
comments: true
showToc: false
---

`git diff`でパッチを作る際に新規ファイルを出力させたいことがあったためメモ

`git add --intent-to-add <ファイル名>`で新しいファイルでもdiffで出力させることが可能

```bash
$ echo hogehoge > newfile
$ git add --intent-to-add newfile
$ git diff
diff --git a/newfile b/newfile <-diffで新規ファイルが表示されるようになった
new file mode 100644
index 0000000..e9bc110
--- /dev/null
+++ b/newfile
@@ -0,0 +1 @@
+hogehoge
```
