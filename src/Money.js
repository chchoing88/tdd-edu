class Money {
  constructor(amount) {
    this._amount = amount || 0;
  }

  equals(objMoney) {
    // objMoney의 인스턴스도 비교하자.
    return (
      this._amount === objMoney._amount &&
      // 이런 자바스크립트 용어를 사용하는 거보다 나중엔 통화(currency) 같은 개념을 사용해서 비교하자.
      this.constructor === objMoney.constructor
    );
  }
}

module.exports = Money;
