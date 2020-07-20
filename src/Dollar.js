const Money = require("./Money");

class Dollar extends Money.Money {
  constructor(amount) {
    super(amount);
  }

  times(multiplier) {
    return new Dollar(this._amount * multiplier);
  }
}

exports.Dollar = Dollar;
