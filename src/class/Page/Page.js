import canvasCreator from "../Canvas/Canvas.js";
import dateUtils from "../utils/date.js"

class PageI extends canvasCreator {
    constructor(content) {
        super()
        const {title} = content;
        this.title = title;
        this.build();
    }
    
    build() {       
        this
            .addText(this.title)
            .addImage({source: "src/image/orange-block.png", left: 800, top: 730})
            .addImage({source: "src/image/blue-block.png", left: 975, top: 0})
            .addImage({source: "src/image/appboster.png", left: 40, top: 260})
            .addImage({source: "src/image/lzmedia.png", left: 320, top: 260})
            .addShape({type: 'rect', width: 270, height: 60, left: 40, top: 600, fill: '#3e2e88'})
            .addText({text: 'appboster.com', left: 60, top: 605, fill: '#ffffff', fontSize: 38})
            .addText({text: dateUtils.getFullDate(), left: 1300, top: 40, fill: '#3e2e88', fontSize: 24})
    }

}


// page.build();
// page
    // .addText({text: `ОТЧЁТ О\nПОИСКОВОМ\nПРОДВИЖЕНИИ`, left: 40, top: 343, fill: '#3e2e88', fontSize: 60})
    // .addShape({type: 'rect', width: 200, height: 200, left: 50, top: 50, fill: '#3e2e88'})

export default PageI;