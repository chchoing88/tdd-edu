const Money = require("./Money");

// console.log("Franc Money", Money);
class Franc extends Money.Money {
  constructor(amount, currency) {
    super(amount, currency);
  }

  times(multiplier) {
    // return new Franc(this._amount * multiplier);
    return Money.Money.franc(this._amount * multiplier);
  }

  currency() {
    return this._currency;
  }
}

exports.Franc = Franc;
