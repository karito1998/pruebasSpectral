module.exports = (data) => {
    const validCodes = ['200', '201', '202', '204', '206', '400', '401', '403', '404', '405', '406', '409', '429', '500', '502', '503', '504', 'default'];
    const codes = Object.keys(data);
    var message = ""
    codes.forEach(function(code){
        let validation = false;
        validCodes.forEach((vcode) => {
            if (code == vcode) { validation = true; }
            else {
                if (vcode == 'default' && !validation) {
                    message = `La API contiene un codigo de error no valido: ${code}`;
                }}
        })
    })
if (message!= ""){
    return [{ message: `${message}` }];}
};