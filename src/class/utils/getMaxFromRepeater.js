import getNumberFromString from "./getNumberFromString.js";

export default (form) => {
    let maxRows = -1;
    let maxColumn = -1;
    Object.keys(form).forEach(key => {
        const numbers = getNumberFromString(key)
        if(numbers) {
            const rows = numbers[0];
            const columns = numbers[1];
            maxRows = Math.max(maxRows, rows);
            maxColumn = Math.max(maxColumn, columns);
        } else {
            maxRows = maxRows
            maxColumn = maxColumn;
        }
    })
    return [maxRows, maxColumn];
}

