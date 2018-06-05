module.exports = (obj => {
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