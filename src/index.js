class Dollar {
  constructor(amount) {
    this.amount = amount || 0;
  }
  times(multiplier) {
    return new Dollar(this.amount * multiplier);
  }
}

module.exports = Dollar;
