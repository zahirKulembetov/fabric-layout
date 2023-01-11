class dateUtils {
    static getFullDate() {
        const date =  new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const formatedMonth = month  <= 9 ? `0${month}` : month;
        const text = `${formatedMonth}/${year}`
        return text;
    }
}


export default dateUtils;