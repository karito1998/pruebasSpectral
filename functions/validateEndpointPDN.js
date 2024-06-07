module.exports = (catalogsDataObj) => {
    var catalogos = Object.keys(catalogsDataObj);
    const regexEndpoint = /(ENDPOINT)/i;

        for(var i = 0; i< catalogos.length; i ++){
            var env = catalogos[i];
        if (env.toLowerCase() == "production") {
            const matchedWordsEndpoint = Object.keys(catalogsDataObj[env].properties).find((propKey) => regexEndpoint.test(propKey));
            const endpointPDN = catalogsDataObj[env].properties[matchedWordsEndpoint];
            if (endpointPDN) {
                const expValidation = /qa|dev|cert/i;
                if (expValidation.test(endpointPDN)) {
                    return [{ message: `El endpoint definido para PDN: ${endpointPDN} no es apropiado. Contiene "dev","qa" o "cert"` }];
                }
            } else {
                return [{ message: "No hay endpoint establecido para PDN." }];
            }
        }
    }//)

};
