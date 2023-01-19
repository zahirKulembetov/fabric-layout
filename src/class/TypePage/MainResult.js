class MainResult {
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
            .addShape({type: 'rect', width: 1440, height: 900, left: 0, top: 0, fill: '#3e2e88'})
            .addText({text: 'ОТЧЁТ О\nПОИСКОВОМ\nПРОДВИЖЕНИИ', left: 40, top: 343, fill: '#ffffff', fontSize: 60})
    }

    static createForm() {
        const html = `
            <label for="title">Заголовок:</label>
            <input type="text" id="title"/>
        `;
        return html;
    }

}

export default MainResult;