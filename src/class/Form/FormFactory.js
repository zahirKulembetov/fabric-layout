import constant from "../../constant/constant.js";
import FormGraphic from "./FormGraphic.js";
import FormTable from "./FormTable.js";

class FormFactory {
    static create(type) {
        let form;
        switch(type) {
            case constant.FORM_TABLE:
                form = new FormTable();
                break;
            case constant.FORM_GRAPHIC:
                form = new FormGraphic();
                break;
            default:
                break;
        }
        form.type = type;
        return form;
    }
}

export default FormFactory;