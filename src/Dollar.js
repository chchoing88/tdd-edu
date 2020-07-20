const Money = require("./Money");

// console.log("Dollar Money", Money);
class Dollar extends Money.Money {
  constructor(amount, currency) {
    super(amount, currency);
  }

  times(multiplier) {
    // return new Dollar(this._amount * multiplier);
    return Money.Money.dollar(this._amount * multiplier);
  }

  currency() {
    return this._currency;
  }
}

exports.Dollar = Dollar;
