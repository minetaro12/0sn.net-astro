---
title: "UbuntuでDHCPサーバーを作る"
date: 2025-09-13T12:13:52Z
tags: ["ubuntu", "dhcp", "linux"]
comments: true
showToc: false
---

## インストール

```bash
$ sudo apt install isc-dhcp-server
```

## 設定
`/etc/dhcp/dhcpd.conf`を編集する。  
以下は基本的な設定（ほかの部分はコメントアウトしてしまってOK）
```conf
default-lease-time 600;
max-lease-time 7200;

subnet 192.168.30.0 netmask 255.255.255.0 {
  range 192.168.30.10 192.168.30.200;
  option domain-name-servers 192.168.30.254;
  option routers 192.168.30.254;
}
```

設定が終了したら必ず`sudo systemctl restart isc-dhcp-server`でサービスの再起動をする。
