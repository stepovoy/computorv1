let reduceInput = require('./reduceInput');
let reduceOutput = require('./reduceOutput');
let findPolynomialDegree = require('./findPolynomialDegree');
let solveEquation = require('./solveEquation');

if (process.argv && process.argv.length === 3) {
  let obj = {
    str: process.argv[2].replace(/ /g,''),
    coefficients: [],
    arr: [],
    reverseOther: false,
    polynomialDegree: 0
  };

  reduceInput(obj);
  reduceOutput(obj);
  findPolynomialDegree(obj);
  solveEquation(obj);

} else if (process.argv.length === 2) {
  console.log("No parameters found in input.");
} else {
  console.log("Too many parameters. Only one string is allowed");
}
