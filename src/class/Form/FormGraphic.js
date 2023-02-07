import FormHTML from "./Form.js";

class FormGraphic extends FormHTML {
    constructor(repeater) {
        super();
        this.repeater = repeater;
        this.default = {
            inputs:  [
            {
                type: 'number',
                text: 'Максимальное',
                id: 'max',
                name: 'max',
                min: 0,
                max: 10000000
            }]
        }
        this.#addRepeaterToForm({inputs: [{type: 'text', text: 'Месяц'}, { type: 'number', text: 'Посетители'}]})
        this.addContentForm(this.default)
        this.form.addEventListener('click', this.#repeaterAdd)
        this._setTypeForm('graphic')
    }
    
    #addRepeaterToForm(opt) {
        console.log(this.form, opt)
        this.form.insertAdjacentHTML('beforeend', this.repeater.createField(opt))
    }
    
    //after close delete listener
    #repeaterAdd = (e) => {
        const target = e.target;
        if(target.classList.contains('repeater-row-button')) {
            const html = this.repeater.createField();
            if(!html) return
            this.form.insertAdjacentHTML('beforeend', html)
        }
    }

    // _destroy() {
    //     this.form.style.display = 'none';
    // }

}

export default FormGraphic;