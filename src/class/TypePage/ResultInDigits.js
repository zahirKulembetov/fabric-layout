class ResultInDigits {
    constructor(canvas) {
        this.typePage = null;
        this.canvas = canvas;
    }

    /**
     * @param {string} type
     */
    set type(type) {
        this.typePage = type;
    }

    get type() {
        return this.typePage;
    }


    build() {
        this.canvas
            .addText({text: '+20%', left: 40, top: 343, fill: '#ff8321', fontSize: 28, textAlign: 'center'})
            .addText({text: '30', left: 0, top: 343, fill: '#3e2e88', fontSize: 250, textAlign: 'center'})
            .addText({text: 'Выполнено коммерческий целей в прошлом месяце', left: 40, top: 650, fill: '#000', fontSize: 18,  textAlign: 'center'})
    }

    static createForm() {
        const html = `
            <label for="title">Заголовок:</label>
            <input type="text" id="title"/>
        `;
        return html;
    }

}

export default ResultInDigits;