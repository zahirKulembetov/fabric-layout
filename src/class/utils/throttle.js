export default (f, ms) => {
    let timer = null;

    return (...args) => {
        if(timer) return;
        timer = setTimeout(() => {
            f(...args);

            clearTimeout(timer);
            timer = null
        }, ms)
    }
}
