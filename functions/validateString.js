module.exports = (data) => {
    if (data == null || typeof data != 'string') {
        return [{ message: `El valor no es un String` }];
    }
};