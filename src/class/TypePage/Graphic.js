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
    }   

    createForm() {
        const html = `
           
        `;
        return html;
    }

}

export default Graphic;