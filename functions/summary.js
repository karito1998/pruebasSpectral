module.exports = (summary) => {
    const maxLength = 300;

    if (summary) {
        if (summary.length > maxLength) {
            return [{ message: `El producto no cuenta con resumen corto, MAX 300 caracteres en el atributo summary` }];
        }
    }
    else {
        return [{ message: `El producto no cuenta con un resumen` }];
    }
};