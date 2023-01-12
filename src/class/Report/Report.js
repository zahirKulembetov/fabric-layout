import FirstPage from "../TypePage/FirstPage.js";

class Report {
    #typePageOption = null;
    #form = null;
    constructor() {
        this.pages = [];
        this.typePage = document.querySelector('#page-type');
        this.#form = document.querySelector('.form-page .form-content');

        this.typePage.addEventListener('change', this.#detectTypePage);
        this.#form.addEventListener('submit', this.#addPage);
    }

    #addPage = (e) => {
        e.preventDefault();
        console.log(Object.fromEntries(new FormData(e.target)))
        if(!this.#typePageOption) return alert('NONONO -> Выберите тип страницы...')
        
        console.log(this.#typePageOption)
    }

    getPages() {
        return this.pages;
    }

    #addFormToDOM(form) {
        this.#form.insertAdjacentHTML('afterbegin', form);
    }

    #detectTypePage = (e) => {
        const value = e.target.value;
        if(!value) return
        this.#typePageOption = e.target.value;
        const form = FirstPage.createForm();;
        this.#addFormToDOM(form);
    }

    #getContentForm = (e) => {
        e.preventDefault();
        console.log(Object.fromEntries(new FormData(e.target)))
        // console.log(e.target)
    }

  
}

export default Report;