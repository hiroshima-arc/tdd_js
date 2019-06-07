### テスト駆動開発から始めるJavaScript入門

---

### 構成

- 自己紹介
- テストファーストから始める JavaScript
- リファクタリングから始める JavaScript
- ふりかえりから始める JavaScript

---

### 自己紹介

- カキギカツユキ
- おっさんプログラマ
- メインの言語は Ruby と JavaScript あと Java
- マイブームは関数型言語
- オブジェクト指向トッテモトッテモムズカシイね

---

### テストファーストから始める JavaScript

---

### お題は FizzBuzz 問題

> 1 から 100 までの数をプリントするプログラムを書け。

> ただし 3 の倍数のときは数の代わりに｢Fizz｣と、5 の倍数のときは｢Buzz｣とプリントし、3 と 5 両方の倍数の場合には｢FizzBuzz｣とプリントすること。

---

### TODO リスト

> 何をテストすべきだろうか --- 着手する前に、必要になりそうなテストをリストに書き出しておこう。

> テスト駆動開発

---

### TODO リスト

- 1 から 100 まで数をプリントできるようにする。
- 3 の倍数のときは数の代わりに｢Fizz｣をプリントできるようにする。
- 5 の倍数のときは｢Buzz｣とプリントできるようにする。
- 3 と 5 両方の倍数の場合には｢FizzBuzz｣とプリントできるようにする。

---

### テストファースト

> いつテストをかくべきだろうか --- それはテスト対象のコードを書く前だ。

> テスト駆動開発

---

### テストファースト

```javascript
const assert = chai.assert;
suite("FizzBuzzTest", () => {
  test("こんにちは世界", () => {
    assert.equal("hello, world", greeting());
  });
});
```

---

### テストファースト

```javascript
const assert = chai.assert;
suite("FizzBuzzTest", () => {
  test("こんにちは世界", () => {
    assert.equal("hello, world", greeting());
  });
});
      
function greeting() {
  return "hello, world";
}
```

---

### 1 から 100 までをプリントする

> アサートファースト

> いつアサーションを書くべきだろうか----最初に書こう

> テスト駆動開発

---

### 1 から 100 までをプリントする

```javascript
test("1から100までをプリントする", () => {
  assert.equal(1, print1To100());
});
```

---

### 1 から 100 までをプリントする

> 仮実装を経て本実装へ

> 失敗するテストを書いてから、最初に行う実装はどのようなものだろうか----ベタ書きの値を返そう。

> テスト駆動開発

---

### 1 から 100 までをプリントする

```javascript
test("1から100までをプリントする", () => {
  assert.equal(1, print1To100());
});

function print1To100() {
  return 1;
}
```

---

### 1 から 100 までをプリントする

> 三角測量

> テストから最も慎重に一般化を引き出すやり方はどのようなものだろうか----２つ以上の例があるときだけ、一般化を行うようにしよう。

> テスト駆動開発

---

### 1 から 100 までをプリントする

```javascript
test("1から100までをプリントする", () => {
  assert.equal(1, print1To100());
  assert.equal(100, print1To100());
});

function print1To100() {
  return 1;
}
```

---

### 1 から 100 までをプリントする

```javascript
test("1から100までをプリントする", () => {
  let list = print1To100();
  assert.equal(1, list[0]);
  assert.equal(100, list[99]);
});

function print1To100() {
  let list = [];
  for (let i = 0; i < 100; i++) {
    list[i] = i + 1;
  }
  return list;
}
```

---

### TODO リスト

- ~~1 から 100 まで数をプリントできるようにする。~~
- 3 の倍数のときは数の代わりに｢Fizz｣をプリントできるようにする。
- 5 の倍数のときは｢Buzz｣とプリントできるようにする。
- 3 と 5 両方の倍数の場合には｢FizzBuzz｣とプリントできるようにする。

---

### 3 で割り切れる場合は Fizz を返す

```javascript
test("3で割り切れる場合はFizzをプリントする", () => {
  assert.equal("Fizz", fizzBuzz(3));
});
```

---

### 3 で割り切れる場合は Fizz を返す

```javascript
test("3で割り切れる場合はFizzをプリントする", () => {
  assert.equal("Fizz", fizzBuzz(3));
});

function fizzBuzz(number) {
  let result = number;
  if (number % 3 === 0) {
    result = "Fizz";
  }
  return result;
}
```

---

### TODO リスト

- ~~1 から 100 まで数をプリントできるようにする。~~
- ~~3 の倍数のときは数の代わりに｢Fizz｣をプリントできるようにする。~~
- 5 の倍数のときは｢Buzz｣とプリントできるようにする。
- 3 と 5 両方の倍数の場合には｢FizzBuzz｣とプリントできるようにする。

---

### 5 で割り切れる場合は Buzz を返す

```javascript
test("5で割り切れる場合はFizzをプリントする", () => {
  assert.equal("Buzz", fizzBuzz(5));
});
```

---

### 5 で割り切れる場合は Buzz を返す

```javascript
test("5で割り切れる場合はBuzzをプリントする", () => {
  assert.equal("Buzz", fizzBuzz(5));
});

function fizzBuzz(number) {
  let result = number;
  if (number % 3 === 0) {
    result = "Fizz";
  } else if (number % 5 === 0) {
    result = "Buzz";
  }
  return result;
}
```

---

### TODO リスト

- ~~1 から 100 まで数をプリントできるようにする。~~
- ~~3 の倍数のときは数の代わりに｢Fizz｣をプリントできるようにする。~~
- ~~5 の倍数のときは｢Buzz｣とプリントできるようにする。~~
- 3 と 5 両方の倍数の場合には｢FizzBuzz｣とプリントできるようにする。

---

### 15 で割り切れる場合は FizzBuzz を返す

```javascript
test("15で割り切れる場合はFizzBuzzをプリントする", () => {
  assert.equal("FizzBuzz", fizzBuzz(15));
});
```

---

### 15 で割り切れる場合は FizzBuzz を返す

```javascript
test("15で割り切れる場合はFizzBuzzをプリントする", () => {
  assert.equal("FizzBuzz", fizzBuzz(15));
});

function fizzBuzz(number) {
  let result = number;
  if (number % 3 === 0 && number % 5 === 0) {
    result = "FizzBuzz";
  } else if (number % 3 === 0) {
    result = "Fizz";
  } else if (number % 5 === 0) {
    result = "Buzz";
  }
  return result;
}
```

---

### TODO リスト

- ~~1 から 100 まで数をプリントできるようにする。~~
- ~~3 の倍数のときは数の代わりに｢Fizz｣をプリントできるようにする。~~
- ~~5 の倍数のときは｢Buzz｣とプリントできるようにする。~~
- ~~3 と 5 両方の倍数の場合には｢FizzBuzz｣とプリントできるようにする。~~

---

### FizzBuzz

```javascript
function fizzBuzz(number) {
  let result = number;
  if (number % 3 === 0 && number % 5 === 0) {
    result = "FizzBuzz";
  } else if (number % 3 === 0) {
    result = "Fizz";
  } else if (number % 5 === 0) {
    result = "Buzz";
  }
  return result;
}

function print1To100() {
  let list = [];
  for (let i = 0; i < 100; i++) {
    list[i] = fizzBuzz(i + 1);
  }
  return list;
}

print1To100();
```

---

### リファクタリングから始める JavaScript

---

### リファクタリング

> リファクタリング（名詞）：外部から見たときの振る舞いを保ちつつ、理解や修正が簡単になるように、ソフトウェアの内部構造を変化させること。

> 新装版 リファクタリング―既存のコードを安全に改善する

---

### リファクタリング

> リファクタリングする（動詞）：一連のリファクタリングを適用して、外部から見た振る舞いの変更なしに、ソフトウェアを再構築すること。

> 新装版 リファクタリング―既存のコードを安全に改善する

---

###  Change Function Declaration(関数名の変更)

へんてこな名前。

```javascript
function print1To100() {
  let list = [];
  for (let i = 0; i < 100; i++) {
    list[i] = fizzBuzz(i + 1);
  }
  return list;
}

print1To100();
```
---

###  Change Function Declaration(関数名の変更)

```javascript
function generateList() {
  let list = [];
  for (let i = 0; i < 100; i++) {
    list[i] = fizzBuzz(i + 1);
  }
  return list;
}

generateList();
```

---

###  Replace Nested Conditional with Guard Clauses(条件分岐のネストからガード節へ)
     
メソッド内に正常ルートが不明確な条件付き振る舞いがある。     
     
```javascript
function fizzBuzz(number) {
  let result = number;
  if (number % 3 === 0 && number % 5 === 0) {
    result = "FizzBuzz";
  } else if (number % 3 === 0) {
    result = "Fizz";
  } else if (number % 5 === 0) {
    result = "Buzz";
  }
  return result;
}
```

---

###  Replace Nested Conditional with Guard Clauses(条件分岐のネストからガード節へ)
     
```javascript
function fizzBuzz(number) {
  let result = number;
  if (number % 3 === 0 && number % 5 === 0) return "FizzBuzz";
  if (number % 3 === 0) return "Fizz";
  if (number % 5 === 0) return "Buzz";
  return result;
}
```

---

###  Inline Variable(変数のインライン化)

簡単な式によって一度だけ代入される一時変数があり、それが他のリファクタリングの障害となっている。
     
```javascript
function fizzBuzz(number) {
  let result = number;
  if (number % 3 === 0 && number % 5 === 0) return "FizzBuzz";
  if (number % 3 === 0) return "Fizz";
  if (number % 5 === 0) return "Buzz";
  return result;
}
```

---

###  Inline Variable(変数のインライン化)
     
```javascript
function fizzBuzz(number) {
  if (number % 3 === 0 && number % 5 === 0) return "FizzBuzz";
  if (number % 3 === 0) return "Fizz";
  if (number % 5 === 0) return "Buzz";
  return number;
}
```

---

###  Extract Variable(説明変数の抽出)

複雑な式がある。
     
```javascript
function fizzBuzz(number) {
  if (number % 3 === 0 && number % 5 === 0) return "FizzBuzz";
  if (number % 3 === 0) return "Fizz";
  if (number % 5 === 0) return "Buzz";
  return number;
}
```

---

###  Extract Variable(説明変数の抽出)
     
```javascript
function fizzBuzz(number) {
  const isFizz = number % 3 === 0;
  const isBuzz = number % 5 === 0;
  
  if (isFizz && isBuzz) return "FizzBuzz";
  if (isFizz) return "Fizz";
  if (isBuzz) return "Buzz";
  
  return number;
}
```

---

###  Replace Loop with Pipeline(ループからパイプラインへ)

繰り返しがある。
     
```javascript
function generateList() {
  let list = [];
  for (let i = 0; i < 100; i++) {
    list[i] = fizzBuzz(i + 1);
  }
  return list;
}
```

---

###  Replace Loop with Pipeline(ループからパイプラインへ)
     
```javascript
function generateList() {
  let list = [];
  [...Array(100).keys()].forEach(i => {
    list.push(fizzBuzz(i + 1));
  });
  return list;
}
```

---

###  Replace Loop with Pipeline(ループからパイプラインへ)
     
```javascript
function generateList() {
  return [...Array(101).keys()].slice(1).map(i => fizzBuzz(i));
}
```

---

###  Replace Loop with Pipeline(ループからパイプラインへ)
     
```javascript
function generateList() {
  return [...Array(101).keys()].slice(1).map(fizzBuzz);
}
```

---

###  Replace Magic Literal(マジックナンバーから定数へ)

特別な意味を持った数字のリテラルがある。
     
```javascript
function generateList() {
  return [...Array(101).keys()].slice(1).map(fizzBuzz);
}
```

---

###  Replace Magic Literal(マジックナンバーから定数へ)
     
```javascript
const MAX_NUMBER = 100;

function generateList() {
  // 配列が0から始まるので1をたさないと99までしか表示されない
  return [...Array(MAX_NUMBER + 1).keys()].slice(1).map(fizzBuzz);
}
```

---

### ふりかえりから始める JavaScript

大切なことなので２回言います

---

### ふりかえりから始める JavaScript

> 皮肉なことに、TDDはテスト技法ではない（Cunninghamの公案)。TDDは分析技法であり、設計技法であり、実際には開発のすべてのアクティビティを構造化する技法なのだ。

> テスト駆動開発

---

### ふりかえりから始める JavaScript

> TDDは分析技法であり、設計技法であり、実際には開発のすべてのアクティビティを構造化する技法なのだ。

> テスト駆動開発

---

### ふりかえりから始める JavaScript

リファクタリングをするにあたって

---

### ふりかえりから始める JavaScript

> リファクタリングに入る前に、しっかりとした一連のテスト群が用意できているかを確認すること。これらのテストには自己診断機能が不可欠である。

> 新装版 リファクタリング―既存のコードを安全に改善する

---

### ふりかえりから始める JavaScript

> テストを完全に自動化して、その結果もテストにチェックさせること。

> 新装版 リファクタリング―既存のコードを安全に改善する

---

### ふりかえりから始める JavaScript

> コンパイラが理解出るコードは誰にでも書ける。すぐれたプログラマは、人間にとってわかりやすいコードを書く。

> 新装版 リファクタリング―既存のコードを安全に改善する

---


### ふりかえりから始める JavaScript

リファクタリングサイクルを回す

1. Compile
1. Test
1. Commit

---

### ふりかえりから始める JavaScript

テスト駆動開発 = ユニットテスト + リファクタリング

---

### ふりかえりから始める JavaScript

<img src="https://d2dcan0armyq93.cloudfront.net/photo/odai/600/40224305201b1ae5379640064e694995_600.jpg" width="600x600">

みんなも テスト駆動開発 をキメようぜ！

---

### おわり

---

### 参照

- [テスト駆動開発](https://www.amazon.co.jp/%E3%83%86%E3%82%B9%E3%83%88%E9%A7%86%E5%8B%95%E9%96%8B%E7%99%BA-Kent-Beck/dp/4274217884/ref=tmm_pap_swatch_0?_encoding=UTF8&qid=&sr=)
- [Refactoring: Improving the Design of Existing Code (2nd Edition)](https://www.amazon.co.jp/Refactoring-Improving-Existing-Addison-Wesley-Signature/dp/0134757599/ref=pd_sbs_14_1/357-0788753-0519007?_encoding=UTF8&pd_rd_i=0134757599&pd_rd_r=531da6c3-3670-11e9-8479-6b76599af025&pd_rd_w=IozYn&pd_rd_wg=yCXVP&pf_rd_p=ad2ea29d-ea11-483c-9db2-6b5875bb9b73&pf_rd_r=T7JA13SSRSYEJJNQAT6D&psc=1&refRID=T7JA13SSRSYEJJNQAT6D)
- [新装版 リファクタリング―既存のコードを安全に改善する― (OBJECT TECHNOLOGY SERIES)](https://www.amazon.co.jp/%E3%83%AA%E3%83%95%E3%82%A1%E3%82%AF%E3%82%BF%E3%83%AA%E3%83%B3%E3%82%B0%E2%80%95%E6%97%A2%E5%AD%98%E3%81%AE%E3%82%B3%E3%83%BC%E3%83%89%E3%82%92%E5%AE%89%E5%85%A8%E3%81%AB%E6%94%B9%E5%96%84%E3%81%99%E3%82%8B%E2%80%95-OBJECT-TECHNOLOGY-Martin-Fowler/dp/427405019X/ref=tmm_pap_swatch_0?_encoding=UTF8&qid=&sr=)
- [リファクタリング:Ruby エディション](https://www.amazon.co.jp/%E3%83%AA%E3%83%95%E3%82%A1%E3%82%AF%E3%82%BF%E3%83%AA%E3%83%B3%E3%82%B0-Ruby%E3%82%A8%E3%83%87%E3%82%A3%E3%82%B7%E3%83%A7%E3%83%B3-Jay-Fields/dp/4048678841/ref=sr_1_2?ie=UTF8&qid=1550819257&sr=8-2&keywords=refactoring+ruby+edition)

---