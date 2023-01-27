import Page from "../Page/Page.js";
import dateUtils from "../utils/date.js";

class First extends Page {
    constructor() {
        super();
        this.build();
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

    //build method not for page it's method for report. This class only contains data about page
    build() {
        this.info['images'] = [{source: "src/image/orange-block.png", left: 800, top: 730}, {source: "src/image/blue-block.png", left: 975, top: 0}, {source: "src/image/projects/appboster.png", left: 40, top: 260}, {source: "src/image/lzmedia.png", left: 320, top: 260}]
        this.info['text'] = [{text: 'ОТЧЁТ О\nПОИСКОВОМ\nПРОДВИЖЕНИИ', left: 40, top: 343, fill: '#3e2e88', fontSize: 60}, {text: 'appboster.com', left: 60, top: 605, fill: '#ffffff', fontSize: 38}, {text: dateUtils.getFullDate(), left: 1300, top: 40, fill: '#3e2e88', fontSize: 24}]
        this.info['figure'] = [{type: 'rect', width: 270, height: 60, left: 40, top: 600, fill: '#3e2e88', selectable: false}]
    }

    createForm() {
        const html = `
            <div class="form-element">
                <label for="title">Заголовок:</label>
                <input type="text" id="title"/>
            </div>
            <div class="form-element">
                <label for="company">Компания:</label>
                <input type="text" id="company"/>
            </div>
           
        `;
        return html;
    }

}

export default First;