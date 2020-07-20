// a.js
console.log("a.js 시작");

// const b = require("./b");
// import { test as b } from "./b.js";

import { b } from "./interner.js";

// module.exports = {
//   call: () => {
//     console.log("a.js의 call에서의 b: ", b);
//   },
// };
console.log("a.js에서의 b:", b);
const a = {
  call: () => {
    console.log("a.js의 call에서의 b: ", b);
  },
};
export { a };
