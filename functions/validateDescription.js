module.exports = (responseObjects) => {
    const operations = Object.keys(responseObjects);
    for (var i = 0; i < operations.length; i++) {
        var operation = operations[i];
        const properties = Object.keys(responseObjects[operation]);
        if (operation != 'head') {
            if (properties.includes("description")) {
                let description = responseObjects[operation].description
                //Pública, Privada, Confidencial, Crítica
                if (!(description.includes("Clasificación de la información:"))) {
                    return [{ message: `La descripción de la operacion no contiene Clasificación de la información: Pública, Privada, Confidencial, Crítica, Interna, etc` }];
                }
            } else {
                return [{ message: `La operacion no contiene descripción` }];
            }

        }

    }
}




    // if (!(data.match(/(OAUTH)/i))) {
    //     if (!data.includes('x-key-type')) { return [{ message: `La definición de seguridad debe tener el campo "x-key-type" definido.`}]}
    //     else {
    //         const definitionsXKeyType = ['client_id', 'client_secret'];
    //         if (!definitionsXKeyType.includes(responseObjects['x-key-type'])) {
    //             return [{ message:`En la definición de seguridad el valor establecido en la etiqueta "x-key-type" no es correcto. Debe ser client_id o client_secret.`}]
    //         }