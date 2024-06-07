module.exports = (data) => {
    let basePath = data.servers[0].url.split('https://$(catalog.host)');
    basePath = basePath[1].split('/');
    let apiVersion="";
    let majorVersion="";
    if (basePath[0] !== '') {
        return [{ message: `El basePath de la API está incorrecto`}];
    } else {
        apiVersion = data.info.version.split('.');
        majorVersion = apiVersion[0];
        for(var i = 0; i< basePath.length; i ++){
            let element= basePath[i];
            if (element.substring(0, 1) === "v") {
                if (!isNaN(element.substring(1, element.length))) {
                    if (element !== "v".concat(majorVersion)) {
                        return [{ message: `No coinciden los valores de la Versión y el Base Path`}];
                    }
                }
            }
        };
    }
};