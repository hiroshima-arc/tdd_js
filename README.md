# テスト駆動開発から始めるJavaScript入門

|  |  |  |
| :------------- | :--------- | :--- |
| ユーザ名        | zero-tdd   |      |
| マネジメントコンソール         |  [AWS]( https://hiroshima-arc.signin.aws.amazon.com/console)  |      |
| Web IDE                     |    [Cloud9](https://ap-northeast-1.console.aws.amazon.com/cloud9/ide/8303dea7388a40018c1fa92c976b2824)  |      |

## 概要

### 目的

### 前提

| ソフトウェア   | バージョン | 備考 |
| :------------- | :--------- | :--- |
| nodejs         | 8.10.0     |      |

## 構成

- [構築](#構築)
- [配置](#配置)
- [運用](#運用)
- [開発](#開発)

## 詳細

### 構築

#### 開発パッケージのセットアップ

```bash
npm init -y
npm install --save-dev npm-run-all watch foreman cpx rimraf markdown-to-html
npm install --save-dev prettier eslint babel-eslint
npm install --save-dev browser-sync connect-browser-sync 
npx browser-sync init
npx eslint --init
touch Procfile
```

**[⬆ back to top](#構成)**

### 配置

**[⬆ back to top](#構成)**

### 運用

**[⬆ back to top](#構成)**

### 開発

#### アプリケーションのセットアップ

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/hiroshima-arc/tdd_js)

```bash
npm install
npm run build
npm start
```

#### 仕様

> 1 から 100 までの数をプリントするプログラムを書け。
> ただし 3 の倍数のときは数の代わりに｢Fizz｣と、5 の倍数のときは｢Buzz｣とプリントし、3 と 5 両方の倍数の場合には｢FizzBuzz｣とプリントすること。

#### 設計

##### TODO リスト

- [x] 1 から 100 まで数をプリントできるようにする。
- [x] 3 の倍数のときは数の代わりに｢Fizz｣をプリントできるようにする。
- [x] 5 の倍数のときは｢Buzz｣とプリントできるようにする。
- [ ] 3 と 5 両方の倍数の場合には｢FizzBuzz｣とプリントできるようにする。

#### ふりかえり

##### Keep

##### Problem

##### Try

**[⬆ back to top](#構成)**

## 参照

