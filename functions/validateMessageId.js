module.exports = (parameters) => {
    for (var i = 0; i < parameters.length; i++) {
        const parameter = parameters[i];
        if (parameter.name == "message-id") {
            if (!parameter.required) {
                return [{ message: `La operación no cuenta con message-id obligatorio` }];
            }
        }
    }
}