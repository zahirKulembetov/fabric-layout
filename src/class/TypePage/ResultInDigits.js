import Page from "../Page/Page.js";

class ResultInDigits extends Page {
    constructor(canvas) {
        super(canvas)
    }


    build() {
        this.canvas
            .addText({text: '+20%', left: 40, top: 343, fill: '#ff8321', fontSize: 28, textAlign: 'center'})
            .addText({text: '30', left: 0, top: 343, fill: '#3e2e88', fontSize: 250, textAlign: 'center'})
            .addText({text: 'Выполнено коммерческий целей в прошлом месяце', left: 40, top: 650, fill: '#000', fontSize: 18,  textAlign: 'center'})
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