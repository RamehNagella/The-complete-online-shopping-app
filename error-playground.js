// const sum = (a, b) => {
//   if (a && b) {
//     return a + b;
//   }
//   throw new Error('Invalid parameters');
// };

// console.log(sum(1));

// const sum = (a, b) => {
//   if (a && b) {
//     return a + b;
//   }
//   throw new Error('Invalid parameters');
// };
// try {
//   console.log(sum(1));
// } catch (error) {
//   console.log('Error occured');
//   //   console.log(error);
// }
// console.log('this works');

// console.log('this works');
// Error occured
// this works

const sum = (a, b) => {
  if (a && b) {
    return a + b;
  }
  throw new Error('Invalid parameters');
};
try {
  console.log(sum(1));
} catch (error) {
  console.log('Error occured');
  console.log(error);
}
// console.log(sum(1));
console.log('this works');
// Error: Invalid parameters
// at sum (/home/admin1/Desktop/Node-First-app1/error-playground.js:32:9)
// at Object.<anonymous> (/home/admin1/Desktop/Node-First-app1/error-playground.js:40:13)
// at Module._compile (node:internal/modules/cjs/loader:1256:14)
// at Module._extensions..js (node:internal/modules/cjs/loader:1310:10)
// at Module.load (node:internal/modules/cjs/loader:1119:32)
// at Module._load (node:internal/modules/cjs/loader:960:12)
// at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)
// at node:internal/main/run_main_module:23:47

// Node.js v18.16.1

// last console will not works
