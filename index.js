if (process.argv && process.argv.length === 3) {
  let obj = {
    str: process.argv[2].replace(/ /g,''),
    coefficients: [],
    arr: [],
    reverseOther: false,
    polynomialDegree: 0
  };

  let reduceInput = (obj => {
    obj.str = obj.str.replace(/[-+=]/g, " $&"); // $& means the whole matched string
    obj.arr = obj.str.split(' ');
    
    for (let i = 0; i < obj.arr.length; i++) {
      let element = obj.arr[i];
      let rest;
      let degree;
      let value;
      let operation;
    
      if (element[0] === '-' || element[0] === '+' || element[0] === '=') {
        operation = element[0];
        element = element.substr(1);
      }
    
      if (!operation) {
        operation = '+';
      }
    
      if (element.includes('X')) {
        if (element.includes('*')) {
          [value, element] = element.split('*');
        }
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
    
      for (let i = 0; i <= degree; i++) {
        if (!obj.coefficients[i]) {
          obj.coefficients[i] = 0; // undefined turn to 0
        }
      }
    
      if (((operation === '-' || operation === '=') && !obj.reverseOther) || (operation === '+' && obj.reverseOther)) {
        value = -value;
        if (operation === '=') {
          obj.reverseOther = true;
        }
      }
    
      obj.coefficients[degree] += value;
    }
  });

  let reduceOutput = (obj => {
    let reducedForm = '';

    for (let i = 0; i < obj.coefficients.length; i++) {
      let operator = '+';
      let value = obj.coefficients[i] ? obj.coefficients[i] : 0;

      operator = (value && value < 0) ? '-' : '+';
      value = value < 0 ? -value : value;
      reducedForm += (reducedForm === '' || value === 0) ? '' : ` ${operator} `;
      if (i === 0) {
        if (value !== 0) {
          reducedForm += value;
        }
      } else if (i === 1) {
        if (value === 1) {
          reducedForm += `X`;
        } else if (value !== 0) {
          reducedForm += `${value} * X`;
        }
      } else {
        if (value === 1) {
          reducedForm += `X^${i}`;
        } else if (value !== 0) {
          reducedForm += `${value} * X^${i}`;
        }
      }
    }

    reducedForm += reducedForm === '' ? 0 : '';

    console.log(`Reduced form: ${reducedForm} = 0`);
  });

  let findPolynomialDegree = (obj => {
    for (let i = obj.coefficients.length; i >= 0; i--) {
      if (obj.coefficients[i] && obj.coefficients[i] !== 0) {
        obj.polynomialDegree = i;
        console.log('Polynomial degree:', obj.polynomialDegree);
        if (obj.polynomialDegree === 0 && obj.coefficients[i] !== 0) {
          console.log(`By the way, equation is wrong.`)
        }
        break;
      }
    }
  });

  let solveEquation = (obj => {
    let results = [];

    if (obj.polynomialDegree === 0) {
      console.log(`There is no indeterminate, nothing to be solved.`)
    } else if (obj.polynomialDegree === 1) {
      console.log(`The solution is:`)
      let [c, b] = obj.coefficients;
      results.push((c / b) * (-1));
    } else if (obj.polynomialDegree === 2) {
      let D;
      let [c, b, a] = obj.coefficients;
      D = b * b - 4 * a * c;
      console.log('Discriminant value:', D);
      if (D === 0) {
        console.log(`Discriminant is 0, the solution is:`);
        results.push((b / (2 * a)) * (-1));
      } else if (D > 0) {
        console.log('Discriminant square root value:', Math.sqrt(D));
        console.log(`Discriminant is strictly positive, the two solutions are:`);
        results.push((b * (-1) - Math.sqrt(D)) / 2 * a, (b * (-1) + Math.sqrt(D)) / 2 * a);
      } else {
        console.log(`Discriminant is strictly negative, can't solve.`);
      }
    } else {
      console.log(`The polynomial degree is stricly greater than 2, I can't solve.`);
    } 

    results.forEach(result => {
      console.log(result);
    })
  });

  reduceInput(obj);
  reduceOutput(obj);
  findPolynomialDegree(obj);
  solveEquation(obj);

} else if (process.argv.length === 2) {
  console.log("No parameters found in input.");
} else {
  console.log("Too many parameters. Only one string is allowed");
}
