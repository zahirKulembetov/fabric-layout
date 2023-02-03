export default (form) => {
    const {count, max} = form;
    const result = { count, max, columns: [] };

    for(let i = 0; i < +count; i++) {
        const date = form[`month-${i}`];
        const value = form[`counts-${i}`];
        result['columns'].push({value, date})
    }
    return result;
}