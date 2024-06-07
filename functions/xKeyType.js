module.exports = (responseObjects) => {
    var data = JSON.stringify(responseObjects);
    if (!(data.match(/(OAUTH)/i))) {
        if (!data.includes('x-key-type')) { return [{ message: `La definición de seguridad debe tener el campo "x-key-type" definido.`}]}
        else {
            const definitionsXKeyType = ['client_id', 'client_secret'];
            if (!definitionsXKeyType.includes(responseObjects['x-key-type'])) {
                return [{ message:`En la definición de seguridad el valor establecido en la etiqueta "x-key-type" no es correcto. Debe ser client_id o client_secret.`}]
            }
    }
}
};