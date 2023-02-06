import events from "../Events/Event.js";
import Modal from "./Modal.js";

class ModalWithForm extends Modal {
    constructor(opt, form) {
        super(opt);
        this.formFactory = form;
        this.form = null;
    }

    addFormType(type) {
        this.form = this.formFactory.create(type);
        this.addForm();
    }

    close() {
        super.close();
        this.form._destroy();
    }

    onSubmit(cb) {
        events.subscribe('submit-modal', cb)
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
            events.notify('submit-modal', form)
        });
    }

}

export default ModalWithForm;