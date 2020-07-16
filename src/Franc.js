class Franc {
  constructor(amount) {
    this.amount = amount || 0;
  }

  times(multiplier) {
    return new Franc(this.amount * multiplier);
  }

  equals(objFranc) {
    return this.amount === objFranc.amount;
  }
}

module.exports = Franc;
