---
title: "HugoからAstroに移行しました"
date: 2025-06-29T09:52:33Z
tags: ["web", "astro", "hugo"]
comments: true
showToc: false
---

タイトルの通り、`0sn.net`をHugo製からAstroに移行しました。  

## 移行した理由

最初はそこまで規模感もなかったのでHugoのテンプレート構文でなんとかなってましたが、色々拡張していくうちに複雑化していき[CSSもかなり肥大化してしまった](https://github.com/minetaro12/hugo-osan-theme/tree/master/assets/scss)ためようやく重い腰を上げてAstroで作成し直しました。

## 技術スタック

- Astro
- Tailwind CSS
- SolidJS（ヘッダー部分のロジックに使用）

なおOGP画像の生成には今まで通り[Goで作成した画像生成バックエンド](https://github.com/minetaro12/go-ogimg)を使っています。

マークダウンのスタイリングにはTailwind CSS Typographyも考えましたが、イマイチしっくりこなかったので[github-markdown-css](https://github.com/sindresorhus/github-markdown-css)を少しカスタマイズして使っています。

## おわりに
使い方に慣れるのに多少時間がかかりましたが、jsxと似たように書けて感触の良いフレームワークだと感じました。  
リポジトリはhttps://github.com/minetaro12/0sn.net-astro にありますので、気になる方は覗いてみてください。

