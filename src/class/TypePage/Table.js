import Page from "../Page/Page.js";

class Table extends Page {
    constructor() {
        super();
        this.build();
    }

    build() {
        this.info['logo'] = ['logo']
        this.info['title'] = ['Поисковая оптимизация']
        this.info['table'] = [{
            percentMainColumn: 70, 
            rows: [
                {texts: ['Запрос', '1.11.2021', '1.12.2021']},
                {texts: ['аренда автокрана в щелково', '1', '2']},
                {texts: ['автовышка телескопическая аренда', '1', '2']},
                {texts: ['манипулятор 10 тонн аренда москва', '1', '2']},
                {texts: ['аренда автовышки 20 метров', '1', '2']}
            ]
        }]
    }   

    createForm() {
        const html = `
           
        `;
        return html;
    }

}

export default Table;