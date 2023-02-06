import events from "../Events/Event.js";

class FormHTML {
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
        events.subscribe('submit', cb)
    }

    _submitForm = (e) => {
        e.preventDefault();
        events.notify('submit', Object.fromEntries(new FormData(e.target)))
    }

    _addElementForForm = (element) => {
        const {type, text, id, name, min, max, wrapperClass = ''} = element;
        const input = 
            `<div class="${wrapperClass}">
                <label for='${id}'>${text}</label>
                <input id='${id}' type='${type}' name='${name}' min='${min}' max='${max}'/> 
            </div>`;
        this.form.insertAdjacentHTML("beforeend", input);
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