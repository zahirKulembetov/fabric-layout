import FormHTML from "./Form.js";

class FormTable extends FormHTML {
    #prevCount = 0;
    constructor(repeater) {
        super();
        this.repeater = repeater;
        this.default = {
            inputs:  [
            {
                type: 'number',
                text: 'Количество колонок',
                id: 'column',
                name: 'column',
                min: 1,
                max: 10
            },
         
        ]
        }
        this.addContentForm(this.default)
        this.#getCountElem('#column');
        this.form.addEventListener('click', this.#repeaterAdd)
        this._setTypeForm('table')
    }


    #getCountElem(id) {
        const count = this.form.querySelector(id);
        count.addEventListener('blur', this.#handlerCountElem)
    }

    #handlerCountElem = (e) => {
        const target = e.target;
        const count = +target.value;

        const inputs = [];

        for(let i = this.#prevCount; i < count; i++) {
            inputs.push({type: 'text', text: `Столбец-${i+1}`})
        }
        this.#prevCount = count;
        this.#addRepeaterToForm({inputs});
    }

    #addRepeaterToForm(opt) {
        this.form.insertAdjacentHTML('beforeend', this.repeater.createField(opt))
        this.repeater.setMaxRow(20)
    }

    #repeaterAdd = (e) => {
        const target = e.target;
        if(target.classList.contains('repeater-row-button')) {
            const html = this.repeater.createField();
            if(!html) return
            this.form.insertAdjacentHTML('beforeend', html)
        }
    }

    // _destroy() {
    //     super._destroy();

    // }

}

export default FormTable;