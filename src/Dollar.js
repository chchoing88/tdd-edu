class Dollar {
  constructor(amount) {
    this.amount = amount || 0;
  }

  times(multiplier) {
    return new Dollar(this.amount * multiplier);
  }

  equals(objDollar) {
    return this.amount === objDollar.amount;
  }
}

module.exports = Dollar;
