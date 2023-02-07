import getMaxFromRepeater from '../utils/getMaxFromRepeater.js'

export default (form) => {
    const {max} = form;
    const result = { max: +max, columns: [] };
    const [rows, columns] = getMaxFromRepeater(form);
    for(let i = 0; i <= rows; i++) {
        for(let j = 0; j <= columns; j++) {
            +j++; //skip
            const date = form[`repeater-field-${i}-${j}`];
            const value = form[`repeater-field-${i}-${+j++}`];
            result['columns'].push({value, date})
        }
    }
    result['count'] = rows + 1;
    return result;
}

