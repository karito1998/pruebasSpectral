module.exports = (catalogsDataObj) => {
    if (catalogsDataObj == null) {
        return [{ message: `No hay una definición de propiedades para cada ambiente: development, sb, testing, production.` }];
    }
    else {
        var catalogos = Object.keys(catalogsDataObj);
        const regexCatalogs = /(?=.*develop)(?=.*(sb|sandbox))(?=.*testing)(?=.*production)/i
        const regexHost = /(HOSTNAME)/i
        const regexTLS = /(TLS|PROFILE)[_-]?/i;

        if (catalogos.toString().match(regexCatalogs)) {
            //Se valida que el hostname coincida con el tlsprofile
            for (var i = 0; i < catalogos.length; i++) {
                var env = catalogos[i];

                const matchedWordsHost = Object.keys(catalogsDataObj[env].properties).find((propKey) => regexHost.test(propKey));
                if (matchedWordsHost) {
                    const hostName = catalogsDataObj[env].properties[matchedWordsHost];
                    const matchedWordsTLS = Object.keys(catalogsDataObj[env].properties).find((propKey) => regexTLS.test(propKey));
                    if (matchedWordsTLS) {
                        const tlsProfile = catalogsDataObj[env].properties[matchedWordsTLS];
                        if (hostName.includes("ocp")) {
                            if (!(tlsProfile.includes("on-premises"))) {
                                return [{ message: `El perfil TLS ${tlsProfile} no es el indicado para la infraestructura correspondiente al host ${hostName} en el catalogo ${env}` }];
                            }
                        } else if (tlsProfile.includes("on-premises")) {
                            return [{ message: `El perfil TLS ${tlsProfile} no es el indicado para la infraestructura correspondiente al host ${hostName} en el catalogo ${env}` }];
                        }
                        else if (tlsProfile == "" || hostName == "" ) { return [{ message: `No hay una valor para profileTls o hostName definida en el catalogo ${env}` }]; }
                    } else { return [{ message: `No hay una etiqueta profileTls definida en el catalogo ${env}` }]; }
                }
                else {
                    return [{ message: `No hay una etiqueta hostName definida en el catalogo ${env}` }];
                }
            }
        } else { return [{ message: `No hay una definición de propiedades para cada ambiente: development, sb, testing, production.` }]; }
    };
};