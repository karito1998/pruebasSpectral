module.exports = (timeout) => {
    if (timeout > 7) {
        return [{ message: `El valor de timeout en los invoke no debería ser mayor que 7. Valor encontrado ${timeout}`}];
    }
}