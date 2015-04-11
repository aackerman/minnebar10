// let variables
// fat arrow syntax
// rest arguments
let add = (...numbers) => {
  return numbers.reduce((memo, n) => {
    return memo += n;
  }, 0);
};
