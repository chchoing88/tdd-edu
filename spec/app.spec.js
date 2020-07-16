const Dollar = require("../src/index");

describe("다중 통화를 지원하는 Money 객체", function () {
  it("Dollar 객체에 곱하기 기능을 둔다.", function () {
    const five = new Dollar(5);
    five.times(2);

    expect(five.amount).toBe(10);
  });
});
