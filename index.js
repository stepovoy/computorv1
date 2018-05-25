// if (process.argv && process.argv.length < 3) {
//   let str = process.argv[1].replace(/ /g,'');
let str = "5 * X^0 + 4 * X^1 + 9.3 * X^2 = 1 * X^0 + 9.3 * X^2 - 1 * X^2".replace(/ /g, '');
let polynoms = [];
let arr = [];
let moreThanQuadratic;
let reverseOther;

str = str.replace(/[-+=]/g, " $&"); // $& means the whole matched string
arr = str.split(' ');

// console.log(str);

for (let i = 0; i < arr.length; i++) {
  let element = arr[i];
  console.log('element', element);
  // if (arr[i][0]) {
  let rest;
  let degree;
  let value;
  let operation;

  if (element[0] === '-' || element[0] === '+' || element[0] === '=') {
    operation = element[0];
    element = element.substr(1);
    // console.log('element splitted', element);
  }

  if (!operation) {
    operation = '+';
  }

  if (element.includes('X')) {
    if (element.includes('*')) {
      [value, element] = element.split('*');
    }
    // console.log('value', value, 'rest', element);
    value = value ? +value : 1; // make value a number
    if (element.includes('^')) {
      [element, degree] = element.split('^');
    }
    degree = degree ? +degree : 1;
  }
  else {
    degree = 0;
    value = +element;
  }
  // console.log('rest', element, 'degree', degree);

  console.log('degree:', degree);
  console.log('value:', value);
  console.log('operation:', operation);
  console.log('');
  // console.log("Reduced form: 4 * X^0 + 4 * X^1 - 9.3 * X^2 = 0");


  if (degree > 2) {
    moreThanQuadratic = true;
  }

  if (!polynoms[degree]) {
    polynoms[degree] = 0; // undefined turn to 0
  }

  if (((operation === '-' || operation === '=') && !reverseOther) || (operation === '+' && reverseOther)) {
    value = -value;
    if (operation === '=') {
      reverseOther = true;
    }
  }

  polynoms[degree] += value;
  console.log(polynoms);
  // }
}

console.log('');
let output = '';

for (let i = 0; i < polynoms.length; i++) {
  let operator = '+';
  let value = polynoms[i] ? polynoms[i] : 0;

  operator = (value && value < 0) ? '-' : '+';
  value = value < 0 ? -value : value;
  output += (output === '' || value === 0) ? '' : ` ${operator} `;
  if (i === 0) {
    if (value !== 0) {
      output += value;
    }
  } else if (i === 1) {
    if (value === 1) {
      output += `X`;
    } else if (value !== 0) {
      output += `${value} * X`;
    }
  } else {
    if (value === 1) {
      output += `X^${i}`;
    } else if (value !== 0) {
      output += `${value} * X^${i}`;
    }
  }
}

output += output === '' ? 0 : '';

console.log(`Reduced form: ${output} = 0`);
// console.log("Reduced form: 4 * X^0 + 4 * X^1 - 9.3 * X^2 = 0");

// todo check validity for bonus #1

// console.log("Reduced form: 4 * X^0 + 4 * X^1 - 9.3 * X^2 = 0");
// console.log("polynomial degree: 2"); // if degree === 3: "The polynomial degree is stricly greater than 2, I can't solve." // todo max degree
// console.log("Discriminant is strictly positive, the two solutions are:"); // todo D = ?
// console.log("0.905239"); // todo x1
// console.log("-0.475131"); // todo x2
// } else if (process.argv.length === 0) {
//   console.log("No parameters found in input.");
// } else {
//   console.log("Too many parameters. Only one string is allowed");
// }
