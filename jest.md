# Jest

페이스북에서 만든 테스트 프레임워크로 빠르게 설치하고, 테스트하기에 적합합니다.

## 특징

- zero config: jest는 별다른 설치 없이, config 없이 대부분의 자바스크립트 프로젝트에 테스트를 할 수 있도록 초점이 맞춰져 있습니다.
- snapshots: 규모가 큰 object 들도 쉽게 유지하고 추적할 수 있도록 테스트를 진행할 수 있습니다.
- isolated: 테스트들은 각각 병렬로 돌아가면서 최고 성능을 자랑합니다.
- great api: `it` 부터 `expect` 까지 Jest는 테스트를 위한 툴킷을 모두 가지고 있습니다. 또한 잘 정돈된 문서와 유지보수를 잘 진행하고 있습니다.
- Node 환경에서 JSDom을 이용하여 테스트를 진행합니다.
- 테스트 러너, 구조화, 단언, 테스트 더블 등의 기능을 모두 포함.

## Babel setting

```bash
npm install --save-dev babel-jest @babel/core @babel/preset-env
```

프로젝트 루트에 babel.config.js을 생성하여 현재 노드 버전에 맞는 Babel을 설정하세요:

```javascript
// babel.config.js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
};
```

> Jest를 설치할 때 babel-jest는 자동으로 설치되고 프로젝트에 바벨 구성이 존재하는 경우 자동으로 파일을 변환합니다. 이 동작을 방지하기위해, 명시적으로 transform 구성 옵션을 재설정할 수 있습니다.

## API

### test.todo(name)

`it.todo(name)` 으로도 쓰일 수 있는 것으로 테스트 할 계획이 있는 경우에 작성합니다.

### describe()

여러개의 test() 코드를 하나의 작업 단위로 묶어줍니다.

### test()

하나의 테스트 케이스를 의미하며 `it()` 과 같은 역할을 합니다.

### expect()

테스트 진행시 값이 특정 조건에 충족하는지 확인할 필요가 있는데 이때, expect는 다른 것들을 검증 할 수 있는 "매처"를 제공해줍니다.

### toBe()

원시 값 또는 객체의 참조 값을 비교합니다. `===` 보다 더 나은 `Object.is` 로 값을 비교합니다.

### toMatch(regexp | string)

실제 값이 기대하는 정규표현식 이나 문자열에 match 가 되는지를 확인합니다.

```javascript
describe('grapefruits are healthy', () => {
  test('grapefruits are a fruit', () => {
    expect('grapefruits').toMatch('fruit');
  });
});
```

### toThrow(error?)

함수가 호출했을 때 throws 를 테스트 합니다.

**반드시 코드를 함수로 감싸야 합니다. 그렇지 않으면 오류가 발생하지 않고 어설 션이 실패합니다.**

```javascript
test('throws on octopus', () => {
  expect(() => {
    drinkFlavor('octopus');
  }).toThrow();
});
```

선택사항으로 구체적인 에러가 던져지는지 테스트 할 수 있습니다.

- 정규 표현식: 에러 메시지가 해당 패턴과 일치하는지 파악
- 문자열: 에러 메세지에 해당 문자열이 포함되어있는지 파악
- 에러 객체: 에러 매세지가 주어진 에러 메세지와 같은지 파악
- 에러 클래스: 에러 객체가 해당 클래스의 인스턴스 인지 파악

### mockFn.mock.calls

모킹 함수의 호출 기록을 배열로 나타냅니다. 모든 호출에 사용되었던 매개변수를 포함하고 있습니다.

아래 예제는 `f` 라는 함수가 두번 호출 되었으며, 첫번째 호출은 `f(arg1, arg2)` 두번쨰 호출은 `f(arg3, arg4)` 입니다.

```javascript
[
  ['arg1', 'arg2'],
  ['arg3', 'arg4'],
];
```

### mockFn.mock.results

모킹 함수의 호출 결과물을 배열에 포함해 둡니다. 배열에는 각각 `type` 프로퍼티와 `value` 프로퍼티를 지닌 객체를 요소로 가집니다.
`type`은 다음과 같은 형식중 하나를 따릅니다.

- `return`: 함수가 평범하게 리턴값을 가졌을때를 나타냅니다.
- `throw`: 에러 값을 던졌을때를 나타냅니다.
- `imcomplete`: 아직 호출이 완료가 되지 않았을 때를 나타냅니다. 이는 모의 함수 자체 또는 모의 함수에서 호출 한 결과를 테스트하는 경우 발생합니다.

아래 예제는 `f` 라는 함수가 3번 호출된 결과입니다. 3번 호출 될 동안 `result1` 을 반환하고, 에러를 반환하고, `result2`를 반환한 경우 입니다.

```javascript
[
  {
    type: 'return',
    value: 'result1',
  },
  {
    type: 'throw',
    value: {
      /* Error instance */
    },
  },
  {
    type: 'return',
    value: 'result2',
  },
];
```

### mockFn.mock.instances

`new` 키워드를 가지고 모킹 함수를 호출하여 인스턴스화 된 모든 객체 인스턴스를 포함하는 배열입니다.

```javascript
const mockFn = jest.fn();

const a = new mockFn();
const b = new mockFn();

mockFn.mock.instances[0] === a; // true
mockFn.mock.instances[1] === b; // true
```

### mockFn.mockClear()

`mockFn.mock.call` 과 `mockFn.mock.instances` 에 저장된 정보를 모두 초기화 시킵니다.

### mockFn.mockReset()

`mockClear()`의 모든 기능을 수행하고 뿐만 아니라 모든 모킹된 return 값과 구현문을 제거합니다.

### jest.fn(implementation)

사용하지 않은 새로운 `mock function`을 리턴합니다. 선택적으로 목킹의 구현부를 받습니다.

```javascript
const mockFn = jest.fn();
mockFn();
expect(mockFn).toHaveBeenCalled();

// With a mock implementation:
const returnsTrue = jest.fn(() => true);
console.log(returnsTrue()); // true;
```

### jest.spyOn(object, methodName)

`jest.fn`과 유사한 모의 함수를 작성하지만 `object[methodName]`에 대한 호출도 추적합니다. Jest 모의 함수를 반환합니다.
만약 기존 함수를 오버라이트를 원한다면 다음과 같이 사용합니다. `jest.spyOn(object, methodName).mockImplementation(() => customImplementation)` or `object[methodName] = jest.fn(() => customImplementation);`

### jest.mock(moduleName, factory, options)

모듈을 required 하였을때 해당 모듈을 자동으로 모킹된 모듈 버젼으로 모킹합니다. `factory` 와 `options` 는 선택 옵션들입니다.

```javascript
// banana.js
module.exports = () => 'banana';

// __tests__/test.js
jest.mock('../banana');

const banana = require('../banana'); // banana will be explicitly mocked.

banana(); // will return 'undefined' because the function is auto-mocked.
```

두번째 인자는 Jest의 자동 모킹 기술을 사용하는 대신에 구체적인 모듈 생성자로 사용할 수 있습니다.

```javascript
jest.mock('../moduleName', () => {
  return jest.fn(() => 42);
});

// This runs the function specified as second argument to `jest.mock`.
const moduleName = require('../moduleName');
moduleName(); // Will return '42';
```

특히 `factory` 파라미터를 default export 함께 ES6 모듈로 사용한다면 `__esModule: true` 프로퍼티가 필요합니다.

```javascript
import moduleName, {foo} from '../moduleName';

jest.mock('../moduleName', () => {
  return {
    __esModule: true,
    default: jest.fn(() => 42),
    foo: jest.fn(() => 43),
  };
});

moduleName(); // Will return 42
foo(); // Will return 43
```

### jest.doMock(moduleName, factory, options)

`babel-jest`를 사용해서 `mock`을 사용하게 되면 자동으로 코드 블럭의 가장 최상단으로 호이스팅이 이뤄지게 됩니다. 이것을 방지하고 싶다면 해당 메서드를 사용하십시요.
같은 파일안에서 모킹 모듈을 다르게 활용하고 싶다면 다음과 같이 작성하십쇼.

```javascript
beforeEach(() => {
  jest.resetModules();
});

test('moduleName 1', () => {
  jest.doMock('../moduleName', () => {
    return jest.fn(() => 1);
  });
  const moduleName = require('../moduleName');
  expect(moduleName()).toEqual(1);
});

test('moduleName 2', () => {
  jest.doMock('../moduleName', () => {
    return jest.fn(() => 2);
  });
  const moduleName = require('../moduleName');
  expect(moduleName()).toEqual(2);
});
```

`jest.doMock()` 과 함께 ES6 의 import 문을 사용하려면 다음 절체를 따라야 합니다.

- `__esModule: true` 프로퍼티를 추가해야 합니다.
- 다이나믹 `import()` 문을 사용합니다.
- 마지막으로 다이나믹 import를 사용하기 위해 Babel을 이용하십쇼 그리고 [babel-plugin-dynamic-import-node](https://www.npmjs.com/package/babel-plugin-dynamic-import-node) 플러그인을 추가하고 바벨에 dynamic importing 설정을 활성화 시키십시오.

```javascript
beforeEach(() => {
  jest.resetModules();
});

test('moduleName 1', () => {
  jest.doMock('../moduleName', () => {
    return {
      __esModule: true,
      default: 'default1',
      foo: 'foo1',
    };
  });
  return import('../moduleName').then(moduleName => {
    expect(moduleName.default).toEqual('default1');
    expect(moduleName.foo).toEqual('foo1');
  });
});

test('moduleName 2', () => {
  jest.doMock('../moduleName', () => {
    return {
      __esModule: true,
      default: 'default2',
      foo: 'foo2',
    };
  });
  return import('../moduleName').then(moduleName => {
    expect(moduleName.default).toEqual('default2');
    expect(moduleName.foo).toEqual('foo2');
  });
});
```

### jest.useFakeTimers(implementation?: 'modern' | 'legacy')

Jest에게 표준 타이머 기능의 가짜 버전을 사용하도록 지시합니다. (`setTimeout`, `setInterval`, `clearTimeout`, `clearInterval`, `nextTick`, `setImmediate`, 그리고 `clearImmediate`)

만약에 인자로 `modern` 을 넘기면 [@sinonjs/fake-timers](https://github.com/sinonjs/fake-timers)를 Jest가 가지고 있는 fake timers 대신에 구현부로 사용하게 될 것입니다. 이것은 추가적인 `Date`와 같은 타이머를 제공합니다. Jest의 27 버전에서는 `modern`이 디폴트 값이 될 것입니다.

```javascript
// timerGame.js
'use strict';

function timerGame(callback) {
  console.log('Ready....go!');
  setTimeout(() => {
    console.log("Time's up -- stop!");
    callback && callback();
  }, 1000);
}

module.exports = timerGame;
```

여기에서 jest.useFakeTimers();를 호출하여 페이크 타이머를 활성화 합니다. 이것은 setTimeout과 다른 타이머 함수를 모의 함수로 대체합니다.

```javascript
// __tests__/timerGame-test.js
'use strict';

jest.useFakeTimers();

test('waits 1 second before ending the game', () => {
  const timerGame = require('../timerGame');
  timerGame();

  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
});
```

### jest.useRealTimers()

Jest에게 실제 버전의 표준 타이머 기능을 사용하도록 지시합니다. `jest.useFakeTimers();` 를 한번 사용하고 나서 다시 real timer를 사용하려고 할때, 꼭 이 메서드를 호출해 주어야 합니다.

### jest.advanceTimersByTime(msToRun)

매크로 작업 대기열 만 실행합니다 (즉, setTimeout () 또는 setInterval () 및 setImmediate ()에 의해 대기중인 모든 작업).
이 API가 호출되면 모든 타이머는 msToRun 밀리 초 단위로 진행됩니다.

```javascript
it('calls the callback after 1 second via advanceTimersByTime', () => {
  const timerGame = require('../timerGame');
  const callback = jest.fn();

  timerGame(callback);

  // 이 시점에, 콜백은 아직 호출되지 않아야 합니다
  expect(callback).not.toBeCalled();

  // 모든 타이머가 실행될때까지 빨기감기
  jest.advanceTimersByTime(1000);

  // 이제 콜백이 호출 되어야 합니다!
  expect(callback).toBeCalled();
  expect(callback).toHaveBeenCalledTimes(1);
});
```

### jest.runOnlyPendingTimers()

현재 보류중인 매크로 작업 만 실행합니다 (즉, setTimeout() 또는 setInterval()에 의해 이 시점까지 대기 한 작업 만). 현재 보류중인 매크로 작업 중 하나라도 새 매크로 작업을 예약하면이 호출로 해당 새 작업이 실행되지 않습니다.

이는 테스트중인 모듈이 콜백이 다른 setTimeout()을 재귀 적으로 예약하는 setTimeout()을 예약하는 시나리오와 같은 시나리오에 유용합니다 (예약이 절대 멈추지 않음을 의미).
이 시나리오에서는 한 번에 한 단계 씩 시간을 앞 당길 수 있는 것이 좋습니다.

```javascript
// infiniteTimerGame.js
'use strict';

function infiniteTimerGame(callback) {
  console.log('Ready....go!');

  setTimeout(() => {
    console.log("Time's up! 10 seconds before the next game starts...");
    callback && callback();

    // 10초 안에 다음 게임이 예정됩니다
    setTimeout(() => {
      infiniteTimerGame(callback);
    }, 10000);
  }, 1000);
}

module.exports = infiniteTimerGame;
```

```javascript
// __tests__/infiniteTimerGame-test.js
'use strict';

jest.useFakeTimers();

describe('infiniteTimerGame', () => {
  test('schedules a 10-second timer after 1 second', () => {
    const infiniteTimerGame = require('../infiniteTimerGame');
    const callback = jest.fn();

    infiniteTimerGame(callback);

    // 이 시점에, 1초 안에 게임 종료 일정을 잡기 위한
    // setTimeout에 대해 단일 호출이 있어야 합니다.
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);

    // 현재 대기 타이머만 빨리감아 고갈시킵니다
    // (그 프로세스 동안 생성되는 새로운 타이머는 없습니다)
    jest.runOnlyPendingTimers();

    // 이 시점에, 1초 타이머가 콜백을 발생시켜야 합니다
    expect(callback).toBeCalled();

    // 그리고 10초 안에 게임을 시작할 수 있는 새로운 타이머가
    // 생성되어야 합니다
    expect(setTimeout).toHaveBeenCalledTimes(2);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 10000);
  });
});
```

### expect.assertions(number)

`expect.assertions(number)` 는 테스트 중에 특정 갯수의 어설 션이 호출되는지 확인합니다. 콜백의 어설 션이 실제로 호출되었는지 확인하기 위해 비동기 코드를 테스트 할 때 유용합니다.
여기서 number는 해당 테스트의 어설 션 갯수를 넣어주면 됩니다.

## Async Test

### Promise

코드가 프로미스를 사용하는 경우, 비동기 테스트를 처리하는 보다 간단한 방법이 있습니다. 테스트로부터 프로미스를 반환시키면, Jest는 그 프로미스가 리졸브 되기를 기다릴 겁니다. 프로미스가 거부되면 테스트는 자동으로 실패합니다.

```javascript
test('the data is peanut butter', () => {
  return fetchData().then(data => {
    expect(data).toBe('peanut butter');
  });
});
```

return 구문을 생략한다면, test는 fetchData() 가 resolve 되고 then() 이 콜백 함수를 호출하기 전에 종료 될것입니다.

promise가 거절 될 것이 예상되는 경우에는 .catch 메서드를 사용하세요. 여기서 특정 어설 션이 호출 되는지를 확인하기 위해 `expect.assertion(number)`를 추가하면 실제로 어셜 션이 호출이 되었는지 확인 할 수 있습니다.

```javascript
test('the fetch fails with an error', () => {
  expect.assertions(1);
  return fetchData().catch(e => expect(e).toMatch('error'));
});
```

### .resolves / .rejects

expect 구문에 `.resolves` 매처를 사용할 수 있으며, Jest는 그 프로미스가 resolve 되기를 기다립니다. 만약에 promise가 거절되면 테스트는 실패할 것입니다.

```javascript
test('the data is peanut butter', () => {
  return expect(fetchData()).resolves.toBe('peanut butter');
});

// or

test('the fetch fails with an error', () => {
  return expect(fetchData()).rejects.toMatch('error');
});
```

### Async / Await

비동기 테스트를 작성하기 위해, test에 전달된 함수 앞에 `async` 키워드를 사용할 수 있습니다.

```javascript
test("the data is peanut butter", async () => {
  const data = await fetchData();
  expect(data).toBe("peanut butter");
});

test("the fetch fails with an error", async () => {
  expect.assertions(1);
  try {
    await fetchData();
  } catch (e) {
    expect(e).toMatch("error");
  }
});

test("the data is peanut butter", async () => {
  await expect(fetchData()).resolves.toBe("peanut butter");
});

test("the fetch fails with an error", async () => {
  await expect(fetchData()).rejects.toThrow("error");
});
```

## Snapshot Test

스냅샷 테스트는 UI가 예상 밖으로 변경되지 않도록 하기 원하는 경우 매우 유용한 도구 입니다.

모바일 앱에서 전형적인 스냅샷 테스트는 UI Component를 렌더링하고 snapshot을 만들고 테스트와 함께 저장되어있던 snapshot 파일을 참조해 비교합니다. 만약 두 snapshot이 매치가 안된다면 테스트는 실패한 것입니다. 의도치 않았던 변화였거나 새로 snapshot을 업데이트 해야할 경우가 되겠습니다.

```javascript
import React from 'react';
import Link from '../Link.react';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<Link page="http://www.facebook.com">Facebook</Link>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
```

처음 수행된다면 다음과 같은 스냡샷 파일이 생성됩니다.

```javascript
exports[`renders correctly 1`] = `
<a
  className="normal"
  href="http://www.facebook.com"
  onMouseEnter={[Function]}
  onMouseLeave={[Function]}
>
  Facebook
</a>
`;
```

`jest --updateSnapshot` 명령으로 실행하면 스냅샷을 재생성 하라고 요청 할 수 있습니다. 이것은 모든 실패 스냅샷 테스트에 대해 스냅샷 산출물을 재생성 할 것입니다.

실패한 스냅샷은 watch 모드에서 대화식으로 업데이트 될 수도 있습니다.

테스트 코드 상에서 인라인 스냅샷을 만들 수 도 있습니다.
먼저, 인자가 없는 .toMatchInlineSnapshot()를 호출하는 테스트를 작성합니다.

```javascript
it('renders correctly', () => {
  const tree = renderer
    .create(<Link page="https://prettier.io">Prettier</Link>)
    .toJSON();
  expect(tree).toMatchInlineSnapshot();
});
```

다음 Jest를 실행하면, tree가 평가되고, 스냅샷이 toMatchInlineSnapshot에 인자로 작성될 것입니다:

```javascript
it('renders correctly', () => {
  const tree = renderer
    .create(<Link page="https://prettier.io">Prettier</Link>)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
<a
  className="normal"
  href="https://prettier.io"
  onMouseEnter={[Function]}
  onMouseLeave={[Function]}
>
  Prettier
</a>
`);
});
```

종종 스냅샷을 할때마다 새롭게 생성되는 필드가 있을 수 있습니다. 이 객체들을 스냅샷 하려고 하면, 실행 할 때마다 스냅샷이 강제로 실패하게 됩니다.
따라서 다음과 같이 작성하면 도움이 됩니다.

```javascript
it('will check the matchers and pass', () => {
  const user = {
    createdAt: new Date(),
    id: Math.floor(Math.random() * 20),
    name: 'LeBron James',
  };

  expect(user).toMatchSnapshot({
    createdAt: expect.any(Date),  // 비대칭 매처
    id: expect.any(Number), // 비대칭 매처
  });
});

// 스냅샷
exports[`will check the matchers and pass 1`] = `
Object {
  "createdAt": Any<Date>,
  "id": Any<Number>,
  "name": "LeBron James",
}
`;
```

## ES6 class mocks

### Automatic mock

jest.mock('./sound-player')을 호출하는 것은 클래스 생성자와 모든 메서드 호출을 감시하는데 사용할 수 있는 유용한 "자동 모의"를 반환합니다. ES6 클래스를 모의 생성자로 교체하고, 모든 메서드를 항상 undefined를 반환하는 모의 함수로 교체합니다. 메서드 호출은 `theAutomaticMock.mock.instances[index].methodName.mock.calls`에 저장됩니다.

클래스에 화살표 함수를 사용한다면, 그것들은 모의의 일부가 되지 않음을 주의하세요. 그 이유는 화살표 함수는 객체의 프로토타입에 존재하지 않고, 단지 함수에 대한 참조를 보유하는 속성(property)들일 뿐이기 때문입니다.

### Manual mock

`__mocks__` 폴더에 모의 구현을 저장하여 수동 모의를 생성하세요. 이를 통해 구현을 지정할 수 있고, 테스트 파일 전반에 걸쳐 사용될 수 있습니다.

### Calling jest.mock() with the module factory parameter

생성자 함수를 모의하기 위해, 모듈 팩토리는 생성자 함수를 반환해야 합니다. 다른 말로, 모듈 팩토리는 함수를 반환하는 함수 - 고차 함수(HOF) 여야 합니다.
팩토리 파라미터의 한계는 jest.mock() 호출이 파일의 최 상단으로 호이스팅 되기 때문에, 먼저 변수를 정의한 다음 팩토리에서 그것을 사용할 수 없다는 것입니다. 예외는 **mock** 이라는 단어로 시작하는 변수에 대해 만들어 집니다.

```javascript
import SoundPlayer from './sound-player';
const mockPlaySoundFile = jest.fn(); // mock 이라는 단어로 시작하는 변수
jest.mock('./sound-player', () => {
  return jest.fn().mockImplementation(() => {
    return {playSoundFile: mockPlaySoundFile};
  });
});
```

### Replacing the mock using mockImplementation() or mockImplementationOnce()

단일 테스트나 모든 테스트에 대해 구현을 변경하기 위해 위의 모든 모의를 기존의 모의에서 mockImplementation()를 호출하여 교체할 수 있습니다.

jest.mock 호출은 코드의 최 상단으로 호이스팅 됩니다. 나중에, 예를 들어 팩토리 파라미터를 사용하는 대신 기존 모의에 mockImplementation() (또는 mockImplementationOnce())를 호출하여 모의를 지정할 수 있습니다. 
필요하다면, 테스트 사이에 모의를 변경하는 것 역시 가능합니다

```javascript
import SoundPlayer from './sound-player';
import SoundPlayerConsumer from './sound-player-consumer';

jest.mock('./sound-player');

describe('When SoundPlayer throws an error', () => {
  beforeAll(() => {
    SoundPlayer.mockImplementation(() => {
      return {
        playSoundFile: () => {
          throw new Error('Test error');
        },
      };
    });
  });

  it('Should throw an error when calling playSomethingCool', () => {
    const soundPlayerConsumer = new SoundPlayerConsumer();
    expect(() => soundPlayerConsumer.playSomethingCool()).toThrow();
  });
});

```

## Configuration

### automock [boolean]

Default: false

해당 옵션은 Jest에게 모든 imported 되는 모듈들에 대해 테스트 진행시 자동으로 mock을 할 수 있게 해줍니다. 모든 테스트에 사용되는 모듈들은 실행문이 교체가 되게 됩니다.

### bail [number | boolean]

Default: 0

Jest 는 기본적으로 모든 테스트와 제품들에 대해 모든 에러를 콘솔에 보여줍니다. bail config option은 n 번 실행후 테스트가 멈출수 있게 해줍니다. `true`로 셋팅시 `1` 로 셋팅이 되게 됩니다.

### browser [boolean]

Default: false

모듈을 확인할 때 Browerify의 browser 필드를 살펴봅니다. 몇몇 모듈들은 작업 환경이 Node 또는 brower 인지에 따라서 다른 버젼의 모듈을 내보내주기 때문입니다.

### cacheDirectory [string]

Default: "/tmp/{path}"

Jest가 해당 경로에 캐싱된 의존성 정보를 저장해두는 디렉토리 경로입니다.

Jest는 한번 의존성트리를 살펴본뒤 쉽게 filesystem을 모으기 위해 캐싱을 해둡니다.

### clearMocks [boolean]

Default: false

자동적으로 매 테스트시 전에 mock 호출과 인스턴스들을 정리해줍니다. 각 테스트 전에 `jest.clearAllMocks()` 호출과 같은 역할을 합니다.
단, 제공되는 모든 mock 구현을 제거하지는 않습니다.

### collectCoverage [boolean]

Default: false

테스트 도중에 커버리지 정보를 표시할지 안할지를 정해줍니다. 이로 인해 실행 콜렉션이 모두 포함 된 모든 실행 파일에 적용되므로 테스트 속도가 크게 느려질 수 있습니다.

### collectCoverageFrom [array]

Default: undefined

glob patterns 배열을 가지고 커버리지 정보를 수집해야하는 파일들을 셋팅합니다. rootDir 내의 모든 파일에 대한 적용 범위 정보가 수집됩니다.

```javascript
{
  "collectCoverageFrom": [
    "**/*.{js,jsx}",
    "!**/node_modules/**",
    "!**/vendor/**"
  ]
}
```

### coverageDirectory [string]

Default: undefined

Jest가 커버리지 파일 결과물을 산출할 경로를 나타냅니다.

### coveragePathIgnorePatterns [array\<string\>]

Default: {"/node_modules/"}

테스트를 실행하기 전에 모든 파일 경로와 일치하는 정규 표현식 패턴 문자열의 배열입니다. 파일 경로가 패턴 중 하나와 일치하면 적용 범위 정보를 건너 뜁니다. `<rootDir>` 문자열 토큰을 사용해서 프로젝트 root 디렉토리 경로를 포함할 수 있습니다. 예 `Example: ["<rootDir>/build/", "<rootDir>/node_modules/"].`

### coverageProvider [string]

코드 커버리지를 실행시킬 제공자를 선택합니다. `babel`이 default로 설정되어있고 `v8`을 설정할 수 있습니다.
`v8` 사용은 실험적이며 Babel 기반의 코드가 아닌 V8의 내장된 코드를 사용합니다. `v8`엔 몇가지 주의사항이 있습니다.

1. `vm.compieFunction`에 노드 버젼을 반드시 포함시켜야 합니다. (node 10.10에서 소개되었습니다.)
2. Test들은 Node test 환경에서 돌아가야 합니다.(jsdom을 지원하려면 [jest-environment-jsdom-sixteen](https://www.npmjs.com/package/jest-environment-jsdom-sixteen)이 필요합니다)

### coverageReporters [array\<string\>]

Default: ["json", "lcov", "text", "clover"]

Jest가 커버리지 리포트를 작성할때 사용하는 리포터의 이름을 나열합니다. 모든 [istanbul reporter](https://github.com/istanbuljs/istanbuljs/tree/master/packages/istanbul-reports/lib) 에서 사용하는 것은 가능합니다.

### coverageThreshold [object]

Default: undefined

적용 범위 결과에 대한 최소 임계 값 시행을 구성하는 데 사용됩니다. 임계 값은 `global` , `glob` 그리고 폴더 및 파일로 지정할 수 있습니다. 만약 임계값에 도달하지 못한다면 jest는 실패하게 됩니다.

음수로 된 임계치는 최소한의 퍼센테이지가 필요한 값을 나타냅니다.

```javascript
{
  ...
  "jest": {
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": -10
      }
    }
  }
}
```

`global` 과 함께 glop 또는 경로들을 설정한다면, 경로가 매칭되는 커버리지 데이터는 전체 커버리지에서 빠지고 임계값은 독립적으로 설정됩니다.
glob들의 임계 값은 glob에 매칭된 모든 파일에 적용됩니다.
path로 지정된 파일을 찾을 수 없으면 오류가 리턴됩니다.

### dependencyExtractor [string]

Default: undefined

이 옵션은 커스텀 디펜던시 extractor를 사용하기 위한 옵션입니다. 이것은 반드시 `extract` 를 가진 객체를 내보내는 노드 모듈이어야 합니다.

```javascript
const fs = require("fs");
const crypto = require("crypto");

module.exports = {
  extract(code, filePath, defaultExtract) {
    const deps = defaultExtract(code, filePath);
    // Scan the file and add dependencies in `deps` (which is a `Set`)
    return deps;
  },
  getCacheKey() {
    return crypto
      .createHash("md5")
      .update(fs.readFileSync(__filename))
      .digest("hex");
  },
};
```

`extract` 함수는 코드에서 발견된 디펜던시들을 iterable (Array, Set, etc.)를 반환됩니다.

해당 모듈에는 `getCacheKey` 함수가 포함되어 로직이 변경되었는지 여부를 판별하기 위해 캐시 키를 생성하고 이에 의존하는 캐시 된 부가 정보를 버려야합니다.

### displayName [string, object]

default: undefined

테스트가 진행되는 동안 테스트와 함께 레이블을 인쇄 할 수 있습니다. 이것은 많은 jest 구성 파일이 있을 수 있는 다중 프로젝트 저장소에서 더 유용합니다. 테스트가 속한 프로젝트를 시각적으로 알려줍니다. 유효한 값은 다음과 같습니다.

```javascript
module.exports = {
  displayName: "CLIENT",
};
// or
module.exports = {
  displayName: {
    name: "CLIENT",
    color: "blue",
  },
};
```

### errorOnDeprecated [boolean]

Default: false

더 이상 사용되지 않는 API를 호출하면 유용한 오류 메시지가 표시됩니다. 업그레이드 프로세스를 완화하는 데 유용합니다.

### extraGlobals [array\<string\>]

Default: undefined

테스트 파일은 [vm](https://nodejs.org/api/vm.html) 내에서 실행되므로 전역 컨텍스트 속성 (예 : Math)에 대한 호출 속도가 느려집니다. 이 옵션을 사용하면 빠른 검색을 위해 vm 내에 정의 할 추가 속성을 지정할 수 있습니다.

```javascript
{
  ...
  "jest": {
    "extraGlobals": ["Math"]
  }
}
```

### forceCoverageMatch [array\<string\>]

Default: ['']

테스트 파일은 일반적으로 코드 커버리지 수집에서 무시됩니다. 이 옵션을 사용하면이 동작을 덮어 쓰고 그렇지 않으면 무시되는 파일을 코드 범위에 포함시킬 수 있습니다.

```javascript
// sum.t.js

export function sum(a, b) {
  return a + b;
}

if (process.env.NODE_ENV === "test") {
  test("sum", () => {
    expect(sum(1, 2)).toBe(3);
  });
}
```

위 파일을 `forceCoverageMatch` 설정을 통해 커버리지를 수집할 수 있습니다.

```javascript
{
  ...
  "jest": {
    "forceCoverageMatch": ["**/*.t.js"]
  }
}
```

### globals [object]

모든 테스트 환경에서 사용할 수 있는 전역 변수 세트입니다.
예를 들어, 다음은 모든 테스트 환경에서 전역 `__DEV__` 변수를 true로 설정합니다.

```javascript
{
  ...
  "jest": {
    "globals": {
      "__DEV__": true
    }
  }
}
```

이곳에서는 객체나 배열같은 참조값을 지정하고 테스트 중간에 몇몇 코드가 해당 값을 변경하면 해당 mutation 값은 테스트 간에 유지되지 않습니다. 또한 global은 함수를 지정할 수 없습니다. 이를 위해서는 `setupFiles`를 사용해야 합니다.

### globalSetup [string]

Default: undefined

이 옵션은 커스텀 global setup 모듈의 사용을 지정하는 옵션입니다. 이것은 모든 테스트 suites 전에 한번 호출되기 위해 async funciont으로 내보내져야 합니다. 이 함수는 Jest의 `globalConfig` 객체를 매개 변수로 가져옵니다.

참고 : 프로젝트에 구성된 전역 설정 모듈(멀티 프로젝트 러너 사용)은 이 프로젝트에서 하나 이상의 테스트를 실행할 때만 트리거됩니다.

참고 : globalSetup을 통해 정의 된 모든 글로벌 변수는 globalTeardown에서만 읽을 수 있습니다. 테스트 스위트에서 여기에 정의 된 글로벌을 검색 할 수 없습니다.

참고 : 코드 변환이 연결된 setup-file에 적용되는 동안 Jest는 `node_modules`안에 있는 모든 코드를 변환하지 않습니다. 이것은 변환을 수행하기 위해 실제 `babel` 이나 `typescript`를 로드해야 하기 때문입니다.

```javascript
// setup.js
module.exports = async () => {
  // ...
  // Set reference to mongod in order to close the server during teardown.
  global.__MONGOD__ = mongod;
};
```

```javascript
// teardown.js
module.exports = async function () {
  await global.__MONGOD__.stop();
};
```

### globalTeardown [string]

Default: undefined

이 옵션을 사용하면 모든 테스트 스위트 후에 한 번 트리거되는 비동기 함수를 내보내는 사용자 정의 글로벌 분류 모듈을 사용할 수 있습니다. 이 함수는 Jest의 globalConfig 객체를 매개 변수로 가져옵니다.

### maxConcurrency [number]

Default: 5

`test.concurrent`를 사용할 때 동시에 실행할 수있는 테스트 수를 제한하는 숫자입니다. 이 제한을 초과하는 모든 테스트는 슬롯이 해제되면 큐에 대기하고 실행됩니다.

### moduleDirectories [array\<string\>]

Default: ["node_modules"]

필요한 모듈 위치에서 재귀 적으로 검색 할 디렉토리 이름 배열입니다. 이 옵션을 설정하면 패키지에 대한 기본값을 덮어 씁니다. 패키지에 대한 node_modules를 계속 검색하려면 다른 옵션과 함께 패키지를 포함하십시오. `["node_modules", "bower_components"]`

### moduleFileExtensions [array\<string\>]

Default: ["js", "json", "jsx", "ts", "tsx", "node"]

모듈이 사용하는 파일 확장자 배열. 파일 확장자를 지정하지 않고 모듈이 필요한 경우 Jest가 왼쪽에서 오른쪽으로 찾는 확장자입니다.

### moduleNameMapper [object<string, string | array\<string\>>]

Default: null

정규 표현식에서 모듈 이름 또는 단일 모듈로 이미지 또는 스타일과 같은 자원을 스텁 할 수있는 모듈 이름 배열로의 맵입니다.
별칭에 매핑 된 모듈은 automocking 활성화 여부에 관계없이 기본적으로 모의 해제됩니다.
또한 번호가 매겨진 역 참조를 사용하여 캡처 된 정규식 그룹을 대체 할 수 있습니다.

```javascript
{
  "moduleNameMapper": {
    "^image![a-zA-Z0-9$_-]+$": "GlobalImageStub",
    "^[./a-zA-Z0-9$_-]+\\.png$": "<rootDir>/RelativeImageStub.js",
    "module_name_(.*)": "<rootDir>/substituted_module_$1.js",
    "assets/(.*)": [
      "<rootDir>/images/$1",
      "<rootDir>/photos/$1",
      "<rootDir>/recipes/$1"
    ]
  }
}
```

매핑이 정의 된 순서가 중요합니다. 패턴은 하나가 맞을 때까지 하나씩 점검됩니다. 가장 구체적인 규칙이 먼저 나열되어야합니다. 이는 모듈 이름 배열에도 적용됩니다.

### modulePathIgnorePatterns [array\<string\>]

Default: []

해당 경로가 모듈 로더에 의해 '보이는' 것으로 간주되기 전에 모든 모듈 경로와 일치하는 정규 표현식 패턴 문자열 배열입니다. 주어진 모듈의 경로가 패턴 중 하나와 일치하면 테스트 환경에서 `require()` 가능하지 않습니다.

### modulePaths [array\<string\>]

Default: []

`modulePaths`는 모듈을 분석 할 때 검색 할 추가 위치에 대한 절대 경로 배열입니다.

### notify [boolean]

Default: false

테스트 결과 알림을 활성화 시킵니다.

### notifyMode [string]

Default: failure-change

특별한 알림 모드를 설정하려면 `notify: true`를 해야합니다.

- `always`: 항상 알림을 보냅니다.
- `failure`: 테스트가 실패했을 때 알림을 보냅니다.
- `success`: 테스트가 통과했을 때 알림을 보냅니다.
- `change`: 상태가 변경되었을 때 알림을 보냅니다.
- `success-change`: 테스트가 통과되거나 실패한 경우 한 번 알림을 보냅니다.
- `failure-change`: 테스트에 실패하거나 통과 할 때 한 번 알림을 보냅니다.

### preset [string]

Default: undefined

Jest 구성의 기본으로 사용되는 사전 설정입니다. 사전 설정은 루트에 jest-preset.json 또는 jest-preset.js 파일이있는 npm 모듈을 가리켜야 합니다.

`foo-bar/jest-preset.js` 이 프리셋은 다음과 같이 셋팅이 가능합니다.

```javascript
{
  "preset": "foo-bar"
}
```

또는 상대 경로로도 설정이 가능합니다.

```javascript
{
  "preset": "./node_modules/foo-bar/jest-preset.js"
}
```

### prettierPath [string]

Default: 'prettier'

인라인 snapshots을 업데이트 하기 위한 prettier 노드 모듈의 경로를 설정합니다.

### projects [array\<string | ProjectConfig\>]

Default: undefined

프로젝트 설정은 경로 또는 glob 패턴의 배열로 제공받습니다. Jest는 지정된 모든 프로젝트에서 동시에 테스트를 동작합니다. 이는 단일 프로젝트 또는 여러 프로젝트에서 동시에 작업 할 때 유용합니다.

```javascript
{
  "projects": ["<rootDir>", "<rootDir>/examples/*"]
}
```

이 예제 구성은 예제 디렉토리의 모든 폴더뿐만 아니라 루트 디렉토리에서도 Jest를 실행합니다. 동일한 Jest 인스턴스에서 무제한의 프로젝트를 실행할 수 있습니다.

프로젝트 기능을 사용하여 여러 구성 또는 여러 러너를 실행할 수도 있습니다. 이를 위해 구성 객체 배열을 전달할 수 있습니다. 예를 들어, 동일한 Jest 호출에서 테스트와 ESLint (jest-runner-eslint를 통해)를 모두 실행하려면 다음을 수행하시면 됩니다.

```javascript
{
  "projects": [
    {
      "displayName": "test"
    },
    {
      "displayName": "lint",
      "runner": "jest-runner-eslint",
      "testMatch": ["<rootDir>/**/*.js"]
    }
  ]
}
```

### reporters [array\<moduleName | [moduleName, options]\>]

Default: undefined

이 구성 옵션을 사용하여 Jest에 사용자 정의 리포터를 추가할 수 있습니다. 사용자 정의 리포터는 해당 이벤트가 발생할 때 호출되는 onRunStart, onTestStart, onTestResult, onRunComplete 메소드를 구현하는 클래스입니다.

```javascript
{
  "reporters": ["<rootDir>/my-custom-reporter.js"]
}
```

만약 사용자 정의 리포트가 셋팅이 되면 default Jest repoter 들은 덮어 쓰여지게 됩니다. default 리포터들을 유지하기 위해선 `default`를 모듈 이름으로 전달 될 수 있습니다.

```javascript
{
  "reporters": ["default", "<rootDir>/my-custom-reporter.js"]
}
```

사용자 정의 리포터 모듈은 GlobalConfig 및 리포터 옵션을 생성자 인수로 사용하는 클래스를 정의해야합니다.

```javascript
// my-custom-reporter.js
class MyCustomReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;
  }

  onRunComplete(contexts, results) {
    console.log("Custom reporter output:");
    console.log("GlobalConfig: ", this._globalConfig);
    console.log("Options: ", this._options);
  }
}

module.exports = MyCustomReporter;
// or export default MyCustomReporter;
```

사용자 지정 reporters는 getLastError() 메소드에서 Error를 반환하여 Jest가 0이 아닌 코드로 종료되도록 할 수도 있습니다.

```javascript
class MyCustomReporter {
  // ...
  getLastError() {
    if (this._shouldFail) {
      return new Error("my-custom-reporter.js reported an error");
    }
  }
}
```

### resetMocks [boolean]

Default: false

매 테스트 전에 mock 상태를 자동으로 재설정 합니다. 각 테스트 전에 `jest.resetAllMocks()` 를 호출하는 것과 같습니다. 이것은 가짜 구현이 제거 된 모의를 갖지만 초기 구현은 복원하지 않습니다.

### resetModules [boolean]

Default: false

기본적으로 각 테스트 파일에는 자체 독립 모듈 레지스트리가 있습니다. resetModule을 활성화하면 개별 테스트를 실행하기 전에 한 단계 더 나아가 모듈 레지스트리를 재설정합니다. 이는 로컬 모듈 상태가 테스트간에 충돌하지 않도록 모든 테스트에 대해 모듈을 분리하는 데 유용합니다. `jest.resetModules()`를 사용하여 프로그래밍 방식으로 수행 할 수 있습니다.

### resolver [string]

Default: undefined

이 옵션은 사용자 정의 resolver를 지정할 수 있습니다. 이 resolver는 함수로 노출되는 node 모듈이어야 하고, 첫번째 인자로는 resolve 하기 위한 path 와 두번쨰 인자로는 다음 구조를 지닌 객체를 인자로 받습니다.

```javascript
{
  "basedir": string,
  "browser": bool,
  "defaultResolver": "function(request, options)",
  "extensions": [string],
  "moduleDirectory": [string],
  "paths": [string],
  "rootDir": [string]
}
```

이 함수는 해결해야 할 모듈의 경로를 반환하거나 모듈을 찾을 수 없으면 오류를 발생시켜야합니다.

### restoreMocks [boolean]

Default: false

매 테스트 전에 모의 상태를 자동으로 복원합니다. 각 테스트 전에 `jest.restoreAllMocks()` 를 호출하는 것과 같습니다. 이것은 가짜 구현을 제거하고 초기 구현을 복원하는 모의로 이어질 것입니다.

### rootDir [string]

Default: Jest의 config 파일이나 package.json 또는 package.json이 없다면 pwd 명령어로 실행되었을때 결과를 root 디렉토리로 설정합니다.

Jest가 테스트 및 모듈 내에서 스캔해야하는 루트 디렉토리. Jest 설정을 package.json 안에 넣고 루트 디렉토리를 리포지토리의 루트로 설정하려는 경우이 구성 매개 변수의 값은 기본적으로 package.json의 디렉토리입니다.

### roots [array\<string\>]

Default: ["\<rootDir\>"]

Jest가 파일을 검색 할 때 사용해야하는 디렉토리의 경로 목록입니다.

### runner [string]

Default: "jest-runner"

이 옵션은 Jest의 기본 test runner를 대신해서 사용하고자 할때 이용합니다. 다음과 같은 러너들이 있습니다.

- [jest-runner-eslint](https://github.com/jest-community/jest-runner-eslint)
- [jest-runner-mocha](https://github.com/rogeliog/jest-runner-mocha)
- [jest-runner-tsc](https://github.com/azz/jest-runner-tsc)
- [jest-runner-prettier](https://github.com/keplersj/jest-runner-prettier)

test-runner 를 작성하기 위해서 생성자에 `globalConfig` 를 받는 class가 노출되어야 합니다. 그리고 `runTests` 메서드가 있어야 합니다.

```javascript
async runTests(
  tests: Array<Test>,
  watcher: TestWatcher,
  onStart: OnTestStart,
  onResult: OnTestSuccess,
  onFailure: OnTestFailure,
  options: TestRunnerOptions,
): Promise<void>
```

테스트 실행기가 직렬로만 실행되는 대신 병렬로 실행되도록 제한해야하는 경우 클래스 isSerial 속성을 true로 설정해야합니다.

### setupFiles [array]

Default: []

테스트 환경을 구성하거나 설정하기 위해 일부 코드를 실행하는 모듈의 경로 목록입니다. 각 setupFile은 테스트 파일 당 한 번씩 실행됩니다. 모든 테스트는 자체 환경에서 실행되므로 이러한 스크립트는 테스트 코드 자체를 실행하기 직전에 테스트 환경에서 실행됩니다.

`setupFiles`가 `setupFilesAfterEnv` 전에 실행된다는 점도 주목할 가치가 있습니다.

### setupFilesAfterEnv [array]

Default: []

각 테스트 전에 테스트 프레임 워크를 구성하거나 설정하기 위해 일부 코드를 실행하는 모듈에 대한 경로 목록입니다. `setupFiles`는 환경에 테스트 프레임 워크가 설치되기 전에 실행되므로 이 ​​스크립트 파일은 환경에 테스트 프레임 워크가 설치된 직후에 일부 코드를 실행할 수있는 기회를 제공합니다.

예를 들어, Jest는 jasmine API를 monkey-patching 하여 작동하는 여러 플러그인을 jasmine에 제공합니다. 더 많은 재스민 플러그인을 믹스에 추가하고 싶거나 (예를 들어, 프로젝트 전체의 사용자 정의 매칭기를 원한다면)이 모듈에서 그렇게 할 수 있습니다.

```javascript
module.exports = {
  setupFilesAfterEnv: ["./jest.setup.js"],
};
```

```javascript
// jest.setup.js
jest.setTimeout(10000); // in milliseconds
```

### snapshotResolver [string]

Default: undefined

test <-> 스냅 샷 경로를 확인할 수 있는 모듈의 경로입니다. 이 구성 옵션을 사용하면 Jest가 디스크에서 스냅 샷 파일을 저장하는 위치를 사용자 정의 할 수 있습니다.

다음은 스냅샷 resolver 모듈 예제 입니다.

```javascript
module.exports = {
  // resolves from test to snapshot path
  resolveSnapshotPath: (testPath, snapshotExtension) =>
    testPath.replace("__tests__", "__snapshots__") + snapshotExtension,

  // resolves from snapshot to test path
  resolveTestPath: (snapshotFilePath, snapshotExtension) =>
    snapshotFilePath
      .replace("__snapshots__", "__tests__")
      .slice(0, -snapshotExtension.length),

  // Example test path, used for preflight consistency check of the implementation above
  testPathForConsistencyCheck: "some/__tests__/example.test.js",
};
```

### snapshotSerializers [array\<string\>]

Default: []

Jest가 스냅 샷 테스트에 사용해야하는 스냅 샷 직렬 변환기 모듈의 경로 목록입니다.

Jest에는 기본 제공 JavaScript 유형, HTML 요소 (Jest 20.0.0+), ImmutableJS (Jest 20.0.0+) 및 React 요소에 대한 기본 직렬 변환기가 있습니다.

### testEnvironment [string]

Default: "jsdom"

테스트에 사용될 테스트 환경. Jest의 기본 환경은 jsdom을 통한 브라우저와 유사한 환경입니다. 노드 서비스를 빌드하는 경우 node 옵션을 사용하여 대신 노드와 유사한 환경을 사용할 수 있습니다.

파일 맨 위에 `@jest-environment` docblock을 추가하여 해당 파일의 모든 테스트에 사용할 다른 환경을 지정할 수 있습니다.

```javascript
/**
 * @jest-environment jsdom
 */

test("use jsdom in this test file", () => {
  const element = document.createElement("div");
  expect(element).not.toBeNull();
});
```

### testEnvironmentOptions [Object]

Default: {}

testEnvironment에 전달 될 테스트 환경 옵션. 관련 옵션은 환경에 따라 다릅니다. 예를 들어 `{userAgent : "Agent/007"}`과 같이 jsdom에 제공된 옵션을 무시할 수 있습니다.

### testMatch [array\<string\>]

(default: `[ "**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)" ]`)

Jest가 테스트 파일을 탐지하기 위해 사용하는 glob 패턴. 기본적으로 `__tests__` 폴더 내의 .js, .jsx, .ts 및 .tsx 파일과 접미사가 .test 또는 .spec 인 파일 (예 : Component.test.js 또는 Component.spec.js)을 찾습니다. test.js 또는 spec.js라는 파일도 찾을 수 있습니다.

### testPathIgnorePatterns [array\<string\>]

Default: ["/node_modules/"]

테스트를 실행하기 전에 모든 테스트 경로와 일치하는 정규 표현식 패턴 문자열의 배열입니다. 테스트 경로가 패턴 중 하나와 일치하면 건너 뜁니다.

### testRegex [string | array\<string\>]

Default: `(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$`

Jest가 테스트 파일을 탐지하는 데 사용하는 패턴입니다. 기본적으로 `__tests__` 폴더 내의 .js, .jsx, .ts 및 .tsx 파일과 접미사가 .test 또는 .spec 인 파일 (예 : Component.test.js 또는 Component.spec.js)을 찾습니다. . test.js 또는 spec.js라는 파일도 찾을 수 있습니다. testMatch [array \<string\>]도 참조하십시오. 그러나 두 옵션을 모두 지정할 수는 없습니다.

다음은 기본 정규식의 시각화입니다.

```
├── __tests__
│   └── component.spec.js # test
│   └── anything # test
├── package.json # not test
├── foo.test.js # test
├── bar.spec.jsx # test
└── component.js # not test
```

### testResultsProcessor [string]

Default: undefined

이 옵션을 사용하면 사용자 정의 결과 프로세서를 사용할 수 있습니다. 이 프로세서는 다음 구조의 오브젝트를 첫 번째 인수로 예상하는 함수를 내보내고 리턴하는 노드 모듈 이어야합니다.

```javascript
{
  "success": bool,
  "startTime": epoch,
  "numTotalTestSuites": number,
  "numPassedTestSuites": number,
  "numFailedTestSuites": number,
  "numRuntimeErrorTestSuites": number,
  "numTotalTests": number,
  "numPassedTests": number,
  "numFailedTests": number,
  "numPendingTests": number,
  "numTodoTests": number,
  "openHandles": Array<Error>,
  "testResults": [{
    "numFailingTests": number,
    "numPassingTests": number,
    "numPendingTests": number,
    "testResults": [{
      "title": string (message in it block),
      "status": "failed" | "pending" | "passed",
      "ancestorTitles": [string (message in describe blocks)],
      "failureMessages": [string],
      "numPassingAsserts": number,
      "location": {
        "column": number,
        "line": number
      }
    },
    ...
    ],
    "perfStats": {
      "start": epoch,
      "end": epoch
    },
    "testFilePath": absolute path to test file,
    "coverage": {}
  },
  ...
  ]
}
```

### testRunner [string]

Default: jasmine2

이 옵션을 사용하면 사용자 정의 테스트 러너를 사용할 수 있습니다. 기본값은 jasmine2입니다. 테스트 러너 구현에 대한 경로를 지정하여 사용자 정의 테스트 러너를 제공 할 수 있습니다.

테스트 러너 모듈은 다음과 같은 함수가 되어야 합니다.

```javascript
function testRunner(
  globalConfig: GlobalConfig,
  config: ProjectConfig,
  environment: Environment,
  runtime: Runtime,
  testPath: string,
): Promise<TestResult>;
```

### testSequencer [string]

Default: @jest/test-sequencer

이 옵션을 사용하면 Jest의 기본값 대신 사용자 지정 시퀀서를 사용할 수 있습니다. sort는 선택적으로 약속을 반환 할 수 있습니다.

테스트 경로를 알파벳순으로 정렬하는 예제 입니다.

```javascript
const Sequencer = require("@jest/test-sequencer").default;

class CustomSequencer extends Sequencer {
  sort(tests) {
    // Test structure information
    // https://github.com/facebook/jest/blob/6b8b1404a1d9254e7d5d90a8934087a9c9899dab/packages/jest-runner/src/types.ts#L17-L21
    const copyTests = Array.from(tests);
    return copyTests.sort((testA, testB) => (testA.path > testB.path ? 1 : -1));
  }
}

module.exports = CustomSequencer;
```

### testTimeout [number]

Default: 5000

Default timeout of a test in milliseconds.

### testURL [string]

Default: "http://localhost"

이 옵션은 jsdom 환경의 URL을 설정합니다. location.href와 같은 속성에 반영됩니다.

### timers [string]

Default: real

이 값을 `fake`로 설정하면 `setTimeout`과 같은 기능에 가짜 타이머를 사용할 수 있습니다. 가짜 타이머는 코드 조각이 테스트에서 기다리기를 원하지 않는 긴 시간 초과를 설정할 때 유용합니다.

### transform [object<string, pathToTransformer | [pathToTransformer, object]>]

Default: undefined

정규 표현식 경로를 transformers 에 매핑하는 옵션입니다. transformer 는 소스 파일을 변환하기 위한 동기 기능을 제공하는 모듈입니다. 예를 들어, 모듈에서 아직 새로운 언어 기능을 사용하거나 노드에서 지원하지 않는 테스트를 사용하려는 경우, 향후 버전의 JavaScript를 현재 버전으로 컴파일하는 많은 컴파일러 중 하나를 플러그인 할 수 있습니다.

`{filePattern : [ 'path-to-transformer', {options}]}`와 같은 transformer에 구성을 전달할 수 있습니다. 예를 들어, 기본이 아닌 동작에 대해 babel-jest를 구성하려면 `{ "\\.js$": ['babel-jest', {rootMode : "upward"}]}` 처럼 설정할 수 있습니다.

### transformIgnorePatterns [array\<string\>]

Default: ["/node_modules/"]

변환하기 전에 모든 소스 파일 경로와 일치하는 정규 표현식 패턴 문자열의 배열입니다. 테스트 경로가 패턴과 일치하면 변환되지 않습니다.

### unmockedModulePathPatterns [array\<string\>]

Default: []

모듈 로더가 자동으로 모의 객체를 반환하기 전 모든 모듈과 일치하는 정규표현식 문자열 배열입니다.
모듈의 경로가 이 목록의 패턴과 일치하면 모듈 로더에 의해 자동으로 mock되지 않습니다.

이는 거의 항상 거의 항상 구현 세부 사항으로 사용되는 (일반적으로 underscore/lo-dash, etc) 일부 '유틸리티' 모듈에 유용합니다. 일반적으로 이 목록을 최대한 작게 유지하고 개별 테스트에서 항상 명시적인 `jest.mock() / jest.unmock()` 호출을 사용하는 것이 가장 좋습니다. 테스트 당 다른 환경의 독자가 테스트를 실행할 환경에 대해 추론하기 위해 테스트 별로 설정 하는 것이 훨씬 쉽습니다.

### verbose [boolean]

Default: false

실행 중에 각 개별 테스트를 보고 해야하는지 여부를 나타냅니다. 실행 후에도 모든 오류가 여전히 맨 아래에 표시됩니다. 테스트 파일이 하나만 있으면 기본값은 true입니다.

### watchPathIgnorePatterns [array\<string\>]

Default: []

감시 모드에서 테스트를 다시 실행하기 전에 모든 소스 파일 경로와 일치하는 RegExp 패턴 배열입니다. 파일 경로가 패턴 중 하나와 일치하면 업데이트 될 때 테스트 재실행이 트리거되지 않습니다.

### watchPlugins [array\<string | [string, Object]\>]

Default: []

이 옵션을 사용하면 사용자 정의 watch 플러그인을 사용할 수 있습니다.

### // [string]

이 옵션은 package.json에서 주석을 허용합니다. package.json 어딘가에 주석 텍스트를이 키의 값으로 포함하십시오.

## reference

- [https://jestjs.io/docs/en/getting-started](https://jestjs.io/docs/en/getting-started)
- [https://mulder21c.github.io/jest/docs/en/next/getting-started](https://mulder21c.github.io/jest/docs/en/next/getting-started)