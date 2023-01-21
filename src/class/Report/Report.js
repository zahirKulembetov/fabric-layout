import FirstPage from "../TypePage/First.js";
//Выбор шаблона отдельно + данные для шаблона и действия с ним отдельно!!!!!!!!
class Report {
    #typePageOption = null;
    #form = null;
    #currentPage = null;
    #savePageButton = null;
    #typePage = null;
    #saveChangesButton = null;
    #callbacks = null;

    constructor(pageFactory) {
        this.pages = [];
        
        this.#typePage = document.querySelector('#page-type');
        this.#form = document.querySelector('.form-page .form-content');
        this.#savePageButton = document.querySelector('.button-save-page');
        this.#saveChangesButton = document.querySelector('.button-save-changes');

        this.#typePage.addEventListener('change', this.#detectTypePage);
        this.#savePageButton.addEventListener('click', this.#savePageHandler);
        this.#saveChangesButton.addEventListener('click', this.#editPage);
        
        this.#callbacks = {};
        this.pageFactory = pageFactory;
    }

    #choosePage = () => {
        if(this.#currentPage) {
            this.#clearCanvas();
        }
        // console.log(Object.fromEntries(new FormData(e.target))); //data from form
        if(!this.#typePageOption) return alert('NONONO -> Выберите тип страницы...');
        this.#currentPage = this.pageFactory.create(this.#typePageOption);
        this.#currentPage.build();
    }


    //save first time and edit

    #editPage = () => {
        if(!this.#currentPage) return
        this.#saveChanges();
        // this.#currentPage = null;
    }

    #saveChanges = () => {
        const pageJson = this.#currentPage.canvas.saveAsJSON();
        this.#currentPage.json = JSON.stringify(pageJson);
        this.#currentPage.image = this.#getImagePage();
        console.log(this.#currentPage)
    }

    #savePageHandler = (e) => {

        if(!this.#currentPage) return
        //Double save one page solve THIS
        //Maybe equal object of changes per page and update
        //In future button for save doesn't exist
        //Clear canvas and go next slide if page doesn't exist
        //If page exist, can edit page and save
        this.#saveChanges();
        this.pages.push(this.#currentPage);
        this.#executeCallbacks('save');
        this.#currentPage = null;
    }
    //get id page and set current page from array
    
    JSONToCanvas = (id) => {
        const page = this.pages[id];
        if(page) {
            this.#currentPage = page;
            const json = JSON.parse(this.#currentPage.json);
            page.canvas.JSONToCanvas(json);    
        } else {
            this.#clearCanvas();
        }
        // const prepareJson = JSON.parse(this.#currentPage['JSON']);
        // this.#currentPage.canvas.JSONToCanvas(prepareJson)
    }

    #clearCanvas() {
        this.#currentPage.canvas.clear();
    }

    #executeCallbacks = (type) => {
        this.#callbacks[type].forEach(cb => cb(this.#currentPage));
    }

    onSavePage = (cb) => {
        if(this.#callbacks['save']) {
            this.#callbacks['save'].push(cb)
        } else {
            this.#callbacks['save'] = [cb];
        }
    }

    getPages() {
        return this.pages;
    }

    getCurrentPage() {
        return this.#currentPage;
    }

    #getImagePage() {
        return this.#currentPage.canvas.getImage();
    }

    #addFormToDOM(form) {
        this.#form.insertAdjacentHTML('afterbegin', form);
    }

    #detectTypePage = (e) => {
        const value = e.target.value;
        if(!value) return
        this.#clearFormContainer();
        this.#typePageOption = e.target.value;
        //before create form check if page exist pass params to init else default init
        console.log(this.#typePageOption)
        this.#choosePage()
        const form = this.#currentPage.createForm();
        this.#addFormToDOM(form);
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

    

  
}

export default Report;