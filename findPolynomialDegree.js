module.exports = (obj => {
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