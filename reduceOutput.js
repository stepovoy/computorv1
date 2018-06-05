module.exports = (obj => {
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