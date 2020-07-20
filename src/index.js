// index.js
// const a = require("./a");
// const b = require("./b");
// import { test as b } from "./b.js";
// import { test as a } from "./a.js";

import { a, b } from "./interner.js";

a.call();
b.call();
