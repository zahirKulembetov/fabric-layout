import Page from "../Page/Page.js";

class Graphic extends Page {
    constructor() {
        super()
        this.build();
    }



    build() {
        this.info['graphic'] = ['graphic']
        this.info['logo'] = ['logo']
        this.info['title'] = ['Поисковая оптимизация']
        this.info['graphic'] = [{
            count: 3, max: 7000, columns: [
                {
                    value:3794,
                    date: 'Январь'
                },
                {
                    value: 4049,
                    date: 'Февраль'
                },
                {
                    value: 5732,
                    date: 'Март'
                }
            ]
        }]
    }   

    createForm() {
        const html = `
           
        `;
        return html;
    }

}

export default Graphic;