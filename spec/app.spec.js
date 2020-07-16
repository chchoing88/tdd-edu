const Dollar = require("../src/Dollar");
const Franc = require("../src/Franc");
const Money = require("../src/Money");

describe("Dollar 객체", function () {
  // it("Dollar 객체에 곱하기 기능을 둔다.", function () {
  //   const five = new Dollar(5);
  //   five.times(2);

  //   expect(five.amount).toBe(10);
  // });

  it("times 메서드로 Dollar 객체에 곱하기 기능을 둔다.", function () {
    //
    // const five = new Dollar(5);
    const five = Money.dallor(5);
    // 삼각측량을 이용했다면 테스트를 통과시키기 위한 상수값 설정으로는 통과시키기 어려웠을 것이다.
    // let product = five.times(2);
    // Dollar의 amount 인스턴스 변수를 사용하는 코드를 Dollar 자신만 쓰게 만들어서 private로 만들자.
    // Dollar.times() 연산의 호출이 곱한 값을 갖는 Dollar를 반환한다는 것을 정확히 말해주지 않는다.
    // expect(product.amount).toBe(10);
    expect(new Dollar(10)).toEqual(five.times(2));
    // expect(product.amount).toBe(15);
    expect(new Dollar(15)).toEqual(five.times(3));
  });

  it("equals 메서드로 같은 양의 달러는 참이 되어야 한다.", function () {
    // 동치성을 일반화 하자.
    expect(new Dollar(5).equals(new Dollar(5))).toBeTrue();
    // 삼각측량 : 예제가 2개 이상 있어야만 코드를 일반화 시킬 수 있다.
    expect(new Dollar(5).equals(new Dollar(6))).toBeFalse();
  });
});

describe("Franc 객체", function () {
  it("times 메서드로 Franc 객체에 곱하기 기능을 둔다.", function () {
    const five = new Franc(5);

    expect(new Franc(10)).toEqual(five.times(2));
    expect(new Franc(15)).toEqual(five.times(3));
  });

  it("equals 메서드로 같은 양의 달러는 참이 되어야 한다.", function () {
    expect(new Franc(5).equals(new Franc(5))).toBeTrue();
    expect(new Franc(5).equals(new Franc(6))).toBeFalse();
  });
});

describe("Money 객체", function () {
  it("equals 메서드로 같은 양의 달러는 참이 되어야 한다.", function () {
    // 같은 통화 화폐가 아니면 false 이어야 한다.
    expect(new Franc(5).equals(new Dollar(5))).toBeFalse();
  });
});
