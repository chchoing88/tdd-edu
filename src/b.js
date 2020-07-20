// b.js
console.log("b.js 시작");

// const a = require("./a");
// import { test as a } from "./a.js";

import { a } from "./interner.js";

// module.exports = {
//   call: () => {
//     console.log("b.js의 call에서의 a: ", a);
//   },
// };
console.log("b.js에서의 a:", a);
const b = {
  call: () => {
    console.log("b.js의 call에서의 a: ", a);
  },
};
export { b };
