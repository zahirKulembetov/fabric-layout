import Page from "../Page/Page.js";

class MainResult extends Page {
    constructor() {
        super()
        this.build();
    }

    build() {
        this.info['figure'] = [{type: 'rect', width: 1440, height: 900, left: 0, top: 0, fill: '#3e2e88', selectable: false}];
        this.info['text'] = [{text: 'ОТЧЁТ О ПОИСКОВОМ ПРОДВИЖЕНИИ', left: 40, top: 430, fill: '#ffffff', fontSize: 28, textAlign: 'center'}];
    }   

    createForm() {
        const html = `
            <label for="title">Заголовок:</label>
            <input type="text" id="title"/>
        `;
        return html;
    }

}

export default MainResult;