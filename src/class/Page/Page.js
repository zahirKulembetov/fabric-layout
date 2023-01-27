
class Page {
    constructor() {
        this.image = null;
        this.json = null;
        this.typePage = null;
        this.info = {};
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

}

export default Page;