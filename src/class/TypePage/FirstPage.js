class FirstPage {
    constructor() {
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

}

export default FirstPage;