import Fabric from "../Canvas/Canvas.js";
import dateUtils from "../utils/date.js"

class Page extends Fabric {
    constructor(options, content) {
        super(options)
        const {title} = content;
        this.title = title;
        this.build();
    }
    //Перенести в Fabric ???
    build() {
        
        this.addText(this.title);
        this.addImage({source: "src/image/orange-block.png", left: 800, top: 730});
        this.addImage({source: "src/image/blue-block.png", left: 975, top: 0});
        this.addShape({type: 'rect', width: 270, height: 60, left: 40, top: 600, fill: '#3e2e88'})
        this.addText({text: 'appboster.com', left: 60, top: 605, fill: '#ffffff', fontSize: 38});
        this.addText({text: dateUtils.getFullDate(), left: 1300, top: 40, fill: '#3e2e88', fontSize: 24})
    }

}

const page = new Page({selection: false}, {
    title: {
        text: 'ОТЧЁТ О\nПОИСКОВОМ\nПРОДВИЖЕНИИ',
        left: 40,
        top: 343, 
        fill: '#3e2e88', 
        fontSize: 60 
    }
});
// page.build();
// page
    // .addText({text: `ОТЧЁТ О\nПОИСКОВОМ\nПРОДВИЖЕНИИ`, left: 40, top: 343, fill: '#3e2e88', fontSize: 60})
    // .addShape({type: 'rect', width: 200, height: 200, left: 50, top: 50, fill: '#3e2e88'})

export default Page;