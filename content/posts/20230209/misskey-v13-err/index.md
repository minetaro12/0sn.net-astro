---
title: "Misskey v13でAn error has occurred!が発生する"
date: 2023-02-09T21:44:18+09:00
tags: ["misskey", "cloudflare"]
comments: true
showToc: false
---
![エラー画面](1.webp)

<https://github.com/misskey-dev/misskey/issues/9791>  
ここに書いてあるように、CloudflareのAuto Minifyの影響の模様。  
構成ルール等を使ってAuto Minifyをオフにすると解決する。

![](2.webp)
![](3.webp)