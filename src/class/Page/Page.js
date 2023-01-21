import { Canvas } from "../Canvas/Canvas.js";



class Page {
    /**
     * 
     * @param {Canvas} canvas 
     */
    constructor(canvas) {
        this.image = null;
        this.json = null;
        this.canvas = canvas;
        this.typePage = null;
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


    setImage(image) {
        this.image = image;
    }
    
    setJson(json) {
        this.json = json;
    }

    setType(type) {
        this.typePage = type;
    }

    addLogo() {
        this.canvas
            .addImage({source: 'src/image/lzmedia.png', left: 1160, top: 40});
    }

    addTitle(title) {
        this.canvas
            .addText({text: title, left: 40, top: 40})
    }

    addNumber() {

    }
    
    build() {      

    }

}

export default Page;