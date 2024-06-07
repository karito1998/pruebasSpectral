module.exports = (data) => {
    const paths = Object.keys(data);
    if (!paths.includes('/health')) {
        var head = false;
        for (var i = 0; i < paths.length; i++) {
            if (paths[i].includes('/health')) { head = true; console.log(head); break; }
        }
        if (!head) { return [{ message: `La API no contiene una operacion head` }]; }
    }
};