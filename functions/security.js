module.exports = (responseObjects) => {
    var securityText = JSON.stringify(responseObjects);
    const regexClientId = /(CLIENT[ _-]?ID)/i; 
    const regexClientSecret = /(CLIENT[ _-]?SECRET)/i; 
    const regexOAuth = /(OAUTH)/i; 

    if (securityText == null || securityText.length < 5 || securityText == '{"":null}') { return [{ message: "La API u Operación contiene un item security vacío"}];}
    else if(!securityText.match(regexOAuth)){
        
        if (securityText.match(regexClientId)) {
            if (!securityText.match(regexClientSecret)) return [{ message: `La API u Operación contiene un item security incompleto ${securityText}`}];
        }
        else if (securityText.match(regexClientSecret)) {
            if (!securityText.match(regexClientId)) return [{ message:`La API u Operación contiene un item security incompleto ${securityText}`}];
        }
    }

    if (securityText.length === 0) {
        return [{ message: 'La API no cuenta con clientId ni clientSecret' }];
    }
};
