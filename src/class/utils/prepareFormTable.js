import getMaxFromRepeater from "./getMaxFromRepeater.js";

export default (form) => {
    // const {column} = form;
    const result = { percentMainColumn: 20, rows: [] };
    const [rows, columns] = getMaxFromRepeater(form);
    console.log(rows, columns)
    for(let i = 0; i <= rows; i++) {
        const texts = [];
        for(let j = 0; j <= columns; j++) {
            texts.push(form[`repeater-field-${i}-${j}`])
        }
        result.rows.push({texts})
    }
    console.log(result)
    return result;
}
