module.exports = (obj => {
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