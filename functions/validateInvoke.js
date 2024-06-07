module.exports = (invoke) => {
    if (!invoke.timeout) {
        return [{ message: `En un invoke de la API no está definido timeout, es obligatorio.`}];
    } 
    if (!invoke['tls-profile'] || !invoke['stop-on-error'] || !invoke['target-url'] ) {
        return [{ message: `Los invoke definidos en la API deben contar con el 'stop-on-error', el 'tls-profile' y el 'target-url'.`}];
    } else {
        if (invoke['stop-on-error'][0] !== 'ConnectionError') {
            return [{ message: `En los invoke definidos en la API debe estar definido el 'stop-on-error' con el valor 'ConnectionError'.`}];
        }
    }
    if (invoke['target-url'] && invoke['target-url'].indexOf('$(') == -1) {
        return [{ message: `La url del endpoint debe estar parametrizada en target-url en el invoke`}];
    }
    if (invoke['tls-profile'] && invoke['tls-profile'].indexOf('$(') == -1) {
        return [{ message: `El perfil TLS debe estar parametrizado en tls-profile en el invoke`}];
    }
};