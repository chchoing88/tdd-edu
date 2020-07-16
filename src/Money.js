class Money {
  constructor(amount) {
    this._amount = amount || 0;
  }

  equals(objMoney) {
    return this._amount === objMoney._amount;
  }
}

module.exports = Money;
