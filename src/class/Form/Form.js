class FormHTML {
    #callback = {};
    constructor() {
        this.form = document.createElement('form');
        this.form.addEventListener('submit', this._submitForm);
        this.form.insertAdjacentElement('beforeend', this.#addButton())
    }

    addContentForm = (opt) => {
        const {inputs} = opt;
        inputs.forEach(this._addElementForForm)
    }

    onSubmit(cb) {
        if(this.#callback['submit']) {
            this.#callback['submit'].push(cb)
        } else {
            this.#callback['submit'] = [cb];
        }
    }

    #executeCb = (type, ...args) => {
        if(this.#callback[type]) {
            this.#callback[type].forEach( cb => cb(...args));
        }
    }

    _submitForm = (e) => {
        e.preventDefault();
        this.#executeCb('submit', Object.fromEntries(new FormData(e.target)))
    }

    _addElementForForm = (inputOpt) => {
        const {type, text, id, name, min, max, wrapperClass = ''} = inputOpt;
        const input = 
            `<div class="${wrapperClass}">
                <label for='${id}'>${text}</label>
                <input id='${id}' type='${type}' name='${name}' min='${min}' max='${max}'/> 
            </div>`;
        this.form.insertAdjacentHTML("afterbegin", input);
    }

    #addButton() {
        const button = document.createElement('button');
        button.classList.add('btn')
        button.type = 'submit';
        button.innerText = 'Добавить';
        return button;
    }

    getForm() {
        return this.form;
    }

    _destroy() {
        this.form.removeEventListener('submit', this._submitForm);
        this.form.remove();
    }
    
}

export default FormHTML;