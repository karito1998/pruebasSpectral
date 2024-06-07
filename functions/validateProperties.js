module.exports = (catalogsDataObj) => {
    const properties = Object.keys(catalogsDataObj.properties);
    const catalogs = Object.keys(catalogsDataObj.catalogs);
    for(var i = 0; i< catalogs.length; i ++){
        var env = catalogs[i];
        const definitionsKeys = Object.keys(catalogsDataObj.catalogs[env].properties);
        for(var i = 0; i< properties.length; i ++){
            var property = properties[i];
            if (!definitionsKeys.includes(property)) {
                return [{ message: `La propiedad definida "${property}" no está definida para ${env}.` }];
            }
        }
    }
};