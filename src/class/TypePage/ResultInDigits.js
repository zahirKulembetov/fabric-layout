import Page from "../Page/Page.js";

class ResultInDigits extends Page {
    constructor() {
        super();
        this.build();
    }


    build() {
        this.info['text'] = [{text: '+20%', left: 40, top: 343, fill: '#ff8321', fontSize: 28, textAlign: 'center'}, {text: '30', left: 40, top: 343, fill: '#3e2e88', fontSize: 250, textAlign: 'center'}, {text: 'Выполнено коммерческий целей в прошлом месяце', left: 40, top: 650, fill: '#000', fontSize: 18,  textAlign: 'center'}];
    }

    createForm() {
        const html = `
            <label for="title">Заголовок:</label>
            <input type="text" id="title"/>
        `;
        return html;
    }

}

export default ResultInDigits;