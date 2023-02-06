import FormHTML from "./Form.js";

class FormGraphic extends FormHTML {
    #prevCount = 0;
    constructor(repeater) {
        super();
        this.repeater = repeater;
        this.default = {
            inputs:  [ {
                type: 'number',
                text: 'Минимальное',
                id: 'min',
                name: 'min',
                min: 0,
                max: 10000000
            }, 
            {
                type: 'number',
                text: 'Максимальное',
                id: 'max',
                name: 'max',
                min: 0,
                max: 10000000
            },
            {
                type: 'number',
                text: 'Количество элементов',
                id: 'count',
                name: 'count',
                min: 1,
                max: 5
            }]
        }
        this.#addRepeaterToForm({inputs: [{type: 'text', text: 'Месяц'}, { type: 'number', text: 'Посетители'}]})
        this.addContentForm(this.default)
        this.#getCountElem();
        this.form.addEventListener('click', this.#repeaterAdd)
    }

    #getCountElem() {
        const count = this.form.querySelector('#count');
        count.addEventListener('blur', this.#handlerCountElem)
    }

    #handlerCountElem = (e) => {
        const inputs = [];
        if(this.#prevCount === 5) return
        const count = +e.target.value;

        for(let i = this.#prevCount; i < count; i++) {
            const countInput =  {
                type: 'number',
                text: 'Количество',
                id: `counts-${i}`,
                name: `counts-${i}`,
                min: 0,
                max: 100000000000
            }
            const textInput = {
                type: 'text',
                text: 'Месяц',
                id: `month-${i}`,
                name: `month-${i}`
            }
            inputs.push(countInput, textInput)
        }
        this.#addInputForColumn(inputs)
        this.#prevCount = count;
    }

    #addInputForColumn(inputs) {
        inputs.forEach(this._addElementForForm)
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