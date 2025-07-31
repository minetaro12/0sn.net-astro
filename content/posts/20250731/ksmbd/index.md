---
title: "ksmbdを試してみる"
date: 2025-07-31T14:18:25Z
tags: ["linux","ksmbd"]
comments: true
showToc: false
---

カーネル6.6以降で`ksmbd`が安定板となっているので試したメモ。
`Ubuntu Server 24.04`で検証を行いました。

## インストール
```bash
$ sudo apt install ksmbd-tools
```

## 設定ファイルのコピー
```bash
sudo cp /etc/ksmbd/ksmbd.conf.example /etc/ksmbd/ksmbd.conf
sudoedit /etc/ksmbd/ksmbd.conf
```

例として以下のような設定を追加する  
書式は`smb.conf`とほぼ同じです。
```conf
[share]
  path = /share
  public = no
  writable = yes
  printable = yes
```

```bash
$ sudo mkdir /share
$ sudo chown $USER:$USER /share
```

設定を編集したら`ksmbd`を再起動する。
```bash
sudo systemctl restart ksmbd
```

## ユーザーの作成
システムに存在するユーザー名で作成をする。
```bash
$ sudo ksmbd.adduser -a $USER
```
