# Jest

## Configuration

## Options

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

### coveragePathIgnorePatterns [array<string>]

Default: {"/node_modules/"}

테스트를 실행하기 전에 모든 파일 경로와 일치하는 정규 표현식 패턴 문자열의 배열입니다. 파일 경로가 패턴 중 하나와 일치하면 적용 범위 정보를 건너 뜁니다. `<rootDir>` 문자열 토큰을 사용해서 프로젝트 root 디렉토리 경로를 포함할 수 있습니다. 예 `Example: ["<rootDir>/build/", "<rootDir>/node_modules/"].`

### coverageProvider [string]

코드 커버리지를 실행시킬 제공자를 선택합니다. `babel`이 default로 설정되어있고 `v8`을 설정할 수 있습니다.
`v8` 사용은 실험적이며 Babel 기반의 코드가 아닌 V8의 내장된 코드를 사용합니다. `v8`엔 몇가지 주의사항이 있습니다.

1. `vm.compieFunction`에 노드 버젼을 반드시 포함시켜야 합니다. (node 10.10에서 소개되었습니다.)
2. Test들은 Node test 환경에서 돌아가야 합니다.(jsdom을 지원하려면 [jest-environment-jsdom-sixteen](https://www.npmjs.com/package/jest-environment-jsdom-sixteen)이 필요합니다)

### coverageReporters [array<string>]

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

### extraGlobals [array<string>]

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

### forceCoverageMatch [array<string>]

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

### moduleDirectories [array<string>]

Default: ["node_modules"]

필요한 모듈 위치에서 재귀 적으로 검색 할 디렉토리 이름 배열입니다. 이 옵션을 설정하면 패키지에 대한 기본값을 덮어 씁니다. 패키지에 대한 node_modules를 계속 검색하려면 다른 옵션과 함께 패키지를 포함하십시오. `["node_modules", "bower_components"]`

### moduleFileExtensions [array<string>]

Default: ["js", "json", "jsx", "ts", "tsx", "node"]

모듈이 사용하는 파일 확장자 배열. 파일 확장자를 지정하지 않고 모듈이 필요한 경우 Jest가 왼쪽에서 오른쪽으로 찾는 확장자입니다.

### moduleNameMapper [object<string, string | array<string>>]

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

### modulePathIgnorePatterns [array<string>]

Default: []

해당 경로가 모듈 로더에 의해 '보이는' 것으로 간주되기 전에 모든 모듈 경로와 일치하는 정규 표현식 패턴 문자열 배열입니다. 주어진 모듈의 경로가 패턴 중 하나와 일치하면 테스트 환경에서 `require()` 가능하지 않습니다.

### modulePaths [array<string>]

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

### projects [array<string | ProjectConfig>]

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

### reporters [array<moduleName | [moduleName, options]>]

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

### resetModules [boolean]

### resolver [string]

### restoreMocks [boolean]

### rootDir [string]

### roots [array<string>]

### runner [string]

### setupFiles [array]

### setupFilesAfterEnv [array]

### snapshotResolver [string]

### snapshotSerializers [array<string>]

### testEnvironment [string]

### testEnvironmentOptions [Object]

### testMatch [array<string>]

### testPathIgnorePatterns [array<string>]

### testRegex [string | array<string>]

### testResultsProcessor [string]

### testRunner [string]

### testSequencer [string]

### testTimeout [number]

### testURL [string]

### timers [string]

### transform [object<string, pathToTransformer | [pathToTransformer, object]>]

### transformIgnorePatterns [array<string>]

### unmockedModulePathPatterns [array<string>]

### verbose [boolean]

Default: false

실행 중에 각 개별 테스트를 보고 해야하는지 여부를 나타냅니다. 실행 후에도 모든 오류가 여전히 맨 아래에 표시됩니다. 테스트 파일이 하나만 있으면 기본값은 true입니다.

### watchPathIgnorePatterns [array<string>]

### watchPlugins [array<string | [string, Object]>]

Default: []

이 옵션을 사용하면 사용자 정의 watch 플러그인을 사용할 수 있습니다.

### // [string]

이 옵션은 package.json에서 주석을 허용합니다. package.json 어딘가에 주석 텍스트를이 키의 값으로 포함하십시오.
