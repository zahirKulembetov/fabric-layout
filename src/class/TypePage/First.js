import Page from "../Page/Page.js";
import dateUtils from "../utils/date.js";

class First extends Page {
    constructor(canvas) {
        super(canvas);
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


    build(formData) {
        console.log(Object.fromEntries(new FormData(formData)));
        // this.addLogo();
        // this.addTitle('TITLE');
        this.canvas
            .addText({text: 'ОТЧЁТ О\nПОИСКОВОМ\nПРОДВИЖЕНИИ', left: 40, top: 343, fill: '#3e2e88', fontSize: 60})
            .addImage({source: "src/image/orange-block.png", left: 800, top: 730})
            .addImage({source: "src/image/blue-block.png", left: 975, top: 0})
            .addImage({source: "src/image/appboster.png", left: 40, top: 260})
            .addImage({source: "src/image/lzmedia.png", left: 320, top: 260})
            .addShape({type: 'rect', width: 270, height: 60, left: 40, top: 600, fill: '#3e2e88'})
            .addText({text: 'appboster.com', left: 60, top: 605, fill: '#ffffff', fontSize: 38})
            .addText({text: dateUtils.getFullDate(), left: 1300, top: 40, fill: '#3e2e88', fontSize: 24})
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