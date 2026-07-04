---
title: "NanoPi R6S向けにu-bootとカーネルをビルド"
date: 2026-07-04T03:29:00Z
tags: ["linux", "nanopi", "u-boot"]
comments: true
showToc: true
---

## 環境構築

ここではUbuntu 24.04を使って確認しました。  
WSLで構築する場合は以下のようなコマンドで環境を構築します。
- `wsl --install --name ubuntu2404 --location <インストール先フォルダ> ubuntu-24.04`

## u-bootのビルド
### 1. 必要なパッケージのインストール

```
$ sudo apt install build-essential gcc-aarch64-linux-gnu bison flex swig python3-dev libssl-dev libgnutls28-dev python3-pyelftools
```

### 2. ソースの取得
ここでは`v2025.10`を使います
```
$ git clone https://source.denx.de/u-boot/u-boot.git --branch=v2025.10
$ git clone https://github.com/rockchip-linux/rkbin.git
$ cd u-boot
```

### 3. ビルドに必要な環境変数の設定
```
$ export CROSS_COMPILE=aarch64-linux-gnu-
$ export ROCKCHIP_TPL=../rkbin/bin/rk35/rk3588_ddr_lp4_2112MHz_lp5_2400MHz_v1.19.bin
$ export BL31=../rkbin/bin/rk35/rk3588_bl31_v1.51.elf
```

### 4. ビルド
```
 $ make nanopi-r6s-rk3588s_defconfig
 $ make all
```

生成された`u-boot-rockchip.bin`を使います。

## カーネルのビルド
### 1. 必要なソース・ツールの取得
```
$ cd ~
$ git clone https://github.com/friendlyarm/sd-fuse_rk3588.git
$ cd sd-fuse_rk3588
$ git clone https://github.com/friendlyarm/kernel-rockchip --depth 1 -b nanopi6-v6.1.y ./out/kernel-rk3588
$ git clone https://github.com/friendlyarm/prebuilts.git -b master --depth 1
$ sudo tar xvf prebuilts/gcc-x64/toolchain-11.3-aarch64.tar.xz -C /
```

### 2. ビルド
```
$ MK_HEADERS_DEB=1 ./build-kernel.sh ubuntu-noble-server-arm64
```

ビルドが終わったら以下のファイルを取り出しておきます。
- `u-boot/u-boot-rockchip.bin`
- `sd-fuse_rk3588/out/kernel-rk3588/arch/arm64/boot/Image`
- `sd-fuse_rk3588/out/kernel-rk3588/arch/arm64/boot/dts/rockchip/rk3588-nanopi6-rev02.dtb`

## SDカードに書き込み
### 1. パーティション作成
`fdisk`等を使って以下のようにパーティションを作成します。  
必ず1番目のパーティションはセクター32768以降に作成してください。(u-bootの格納領域があるため)
```
Device       Boot  Start     End Sectors  Size Id Type
/dev/sdX1          32768  237567  204800  100M 83 Linux
/dev/sdX2         237568 2097151 1859584  908M 83 Linux
```

### 2. ファイルシステム作成
1番目はFAT32、2番目はext4にします。
```
$ sudo mkfs.vfat -F32 /dev/sdX1
$ sudo mkfs.ext4 /dev/sdX2
```

### 3. ブートローダー書き込み
`/dev/sdX`はSDカードのデバイス名に置き換えてください。
```
$ sudo dd if=u-boot-rockchip.bin of=/dev/sdX seek=64 conv=notrunc
```

### 4. ファイルの配置
1番目のパーティションに以下のように配置します。
```
.
├── extlinux
│   └── extlinux.conf
├── Image
└── rk3588-nanopi6-rev02.dtb
```

`extlinux/extlinux.conf`は以下のように作成します。
```
label NanoPiR6S Linux
    kernel /Image
    fdt /rk3588-nanopi6-rev02.dtb
    append root=/dev/mmcblk0p2 rootwait rw
```

### 5. rootfsの展開
2番目のパーティションにrootfsを展開します。
ここでは手順を省略しますが、debootstrap等を使ってUbuntuやDebianを展開するのが楽です。
