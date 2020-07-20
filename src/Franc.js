const Money = require("./Money");

class Franc extends Money.Money {
  constructor(amount) {
    super(amount);
  }

  times(multiplier) {
    return new Franc(this._amount * multiplier);
  }
}

exports.Franc = Franc;
