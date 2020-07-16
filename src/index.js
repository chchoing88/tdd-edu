class Dollar {
  constructor(amount) {
    this.amount = amount || 0;
  }
  times(multiplier) {
    this.amount *= multiplier;
  }
}

module.exports = Dollar;
