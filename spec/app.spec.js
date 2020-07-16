const Dollar = require("../src/index");

describe("다중 통화를 지원하는 Money 객체", function () {
  // it("Dollar 객체에 곱하기 기능을 둔다.", function () {
  //   const five = new Dollar(5);
  //   five.times(2);

  //   expect(five.amount).toBe(10);
  // });

  it("times 메서드로 Dollar 객체에 곱하기 기능을 둔다.", function () {
    const five = new Dollar(5);
    // 삼각측량을 이용했다면 테스트를 통과시키기 위한 상수값 설정으로는 통과시키기 어려웠을 것이다.
    let product = five.times(2);
    expect(product.amount).toBe(10);
    product = five.times(3);
    expect(product.amount).toBe(15);
  });

  it("equals 메서드로 같은 양의 달러는 참이 되어야 한다.", function () {
    // 동치성을 일반화 하자.
    expect(new Dollar(5).equals(new Dollar(5))).toBeTrue();
    // 삼각측량 : 예제가 2개 이상 있어야만 코드를 일반화 시킬 수 있다.
    expect(new Dollar(5).equals(new Dollar(6))).toBeFalse();
  });
});
