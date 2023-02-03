import Modal from "./Modal.js";

class ModalWithForm extends Modal {
    #callback = {};
    constructor(opt, form) {
        super(opt);
        this.form = form;
    }

    addFormType(type) {
        this.form = this.form.create(type);
        this.addForm();
    }

    close() {
        super.close();
        this.form._destroy();
    }

    onSubmit(cb) {
        if(this.#callback['submit-modal']) {
            this.#callback['submit-modal'].push(cb)
        } else {
            this.#callback['submit-modal'] = [cb];
        }
    }

    #executeCb = (type, ...args) => {
        if(this.#callback[type]) {
            this.#callback[type].forEach( cb => cb(...args));
        }
    }

    addForm(opt) {
        // const {inputs} = opt;
        const form = this.form.getForm();
        this._addBody(form);
        this.#onSubmit();
        // this.form.addContentForm()
    }

    #onSubmit() {
        this.form.onSubmit(form => {
            this.#executeCb('submit-modal', form)
        });
    }

}

export default ModalWithForm;