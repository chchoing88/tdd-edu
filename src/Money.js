class Money {
  constructor(amount, currency) {
    this._amount = amount || 0;
    this._currency = currency;
  }

  static dollar(amount) {
    return new Dollar.Dollar(amount, "USD");
  }

  static franc(amount) {
    return new Franc.Franc(amount, "CHF");
  }

  equals(objMoney) {
    // objMoney의 인스턴스도 비교하자.
    return (
      this._amount === objMoney._amount &&
      // 이런 자바스크립트 용어를 사용하는 거보다 나중엔 통화(currency) 같은 개념을 사용해서 비교하자.
      this.constructor === objMoney.constructor
    );
  }

  times(multiplier) {}

  currency() {
    return this._currency;
  }
}

exports.Money = Money;

// Node.js 의 순환 의존성...
const Dollar = require("./Dollar");
const Franc = require("./Franc");
