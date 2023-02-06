import Canvas  from "../Canvas/Canvas.js";
import events from "../Events/Event.js";
import LayoutUtil from "../utils/layoutUtil.js"

class Report {
    #typePageOption = null;
    #form = null;
    #currentPage = null;
    #methodByType = null;
     /**
     * @param {Canvas} canvas
     */
    constructor(pageFactory, canvas) {
        this.pages = [];
        
        this.#form = document.querySelector('.form-page .form-content');
        this.pageFactory = pageFactory;
        this.canvas = canvas;

        this.#createByType();
    }

    #choosePage = () => {
        if(this.#currentPage) {
            this.#clearCanvas();
        }
        // console.log(Object.fromEntries(new FormData(e.target))); //data from form
        if(!this.#typePageOption) return alert('NONONO -> Выберите тип страницы...');
        this.#currentPage = this.pageFactory.create(this.#typePageOption);
        console.log(this.#currentPage)
        this.#drawPage();
        this.#currentPage.build();
    }




    editPage = () => {
        if(!this.#currentPage) return
        this.#saveChanges();
        // this.#currentPage = null;
    }

    #saveChanges = () => {
        const pageJson = this.canvas.saveAsJSON();
        this.#currentPage.json = JSON.stringify(pageJson);
        this.#currentPage.image = this.#getImagePage();
        console.log(pageJson)
    }

    savePageHandler = (e) => {

        if(!this.#currentPage) return
      
        this.#saveChanges();
        this.pages.push(this.#currentPage);
        events.notify('save', this.#currentPage);
        this.#currentPage = null;
    }
    
    JSONToCanvas = (id) => {
        console.log(this.pages)
        const page = this.pages[id];
        if(page) {
            this.#currentPage = page;
            const json = JSON.parse(this.#currentPage.json);
            this.canvas.JSONToCanvas(json);    
        } else {
            this.#clearCanvas();
            this.#currentPage = null;
            // console.log(this.#currentPage)
        }
        // const prepareJson = JSON.parse(this.#currentPage['JSON']);
        // this.#currentPage.canvas.JSONToCanvas(prepareJson)
    }

    #clearCanvas() {
        this.canvas.clear();
    }


    onSavePage = (cb) => {
        events.subscribe('save', cb)
    }

    onDeletePage = (cb) => {
        events.subscribe('delete-page', cb)
    }

    getPages() {
        return this.pages;
    }

    getCurrentPage() {
        return this.#currentPage;
    }

    getPageByIndex(idx) {
        return this.pages[idx];
    } 

    #getImagePage() {
        return this.canvas.getImage();
    }

    #addFormToDOM(form) {
        this.#form.insertAdjacentHTML('afterbegin', form);
    }

    detectTypePage = (e) => {
        const value = e.target.value;
        if(!value) return
        this.#clearFormContainer();
        this.#typePageOption = e.target.value;
        this.#choosePage()
        const form = this.#currentPage.createForm();
        this.#addFormToDOM(form);
    }

    detectTypeLayout = (e) => {
        const value = e.target.value;
        if(!value) return;
        const source = LayoutUtil.getLayout(value);
        if(!source) return
        this.#addImage({source, width: 2440, height: 900, back: true});
    }
    
    #getContentForm = (e) => {
        e.preventDefault();
        console.log(Object.fromEntries(new FormData(e.target)))
        // console.log(e.target)
    }

    #clearFormContainer() {
        const children = Array.from(this.#form.children);
        children.forEach(child => child.remove())
    }

    deletePage = (e) => {
        if(!this.getCurrentPage()) return;
        const deleteIdxPage = this.pages.indexOf(this.getCurrentPage());
        this.pages.splice(deleteIdxPage, 1);
        this.#currentPage = null;
        this.#clearCanvas();
        events.notify('delete-page', deleteIdxPage);
    }

    


    #drawPage() {
        const info = this.#currentPage['info'];
        for(const type in info) {
            info[type].forEach(element => this.#methodByType[type].call(this, element));
        }
    }

    #addImage(options) {
        this.canvas.addImage(options);
    }

    #addShape(options) {
        this.canvas.addShape(options);
    }

    #addText(options) {
        this.canvas.addText(options);
    }

    #addGraphic(options) {
        this.canvas.addGraphic(options);
    }

    #addTable(options) {
        this.canvas.addTable(options);
    }

    #addLogo(options) {
        this.canvas.addLogo(options);
    }

    #addTitle(options) {
        this.canvas.addTitle(options)
    }
 
    #createByType() {
        this.#methodByType = {
            'images': this.#addImage,
            'figure': this.#addShape,
            'text': this.#addText,
            'graphic': this.#addGraphic,
            'table': this.#addTable,
            'logo': this.#addLogo,
            'title': this.#addTitle
        }
    }

  
}

export default Report;