import First from "../TypePage/First.js";
import constant from "../../constant/constant.js"
import MainResult from "../TypePage/MainResult.js";
import ResultInDigits from "../TypePage/ResultInDigits.js";
import Graphic from "../TypePage/Graphic.js";
import Table from "../TypePage/Table.js";
import Bonus from "../TypePage/Bonus.js";


class PageFactory {
    create(type) {
        let page;
        switch(type) {
            case constant.FIRST:
                page = new First();
                break;
            case constant.TITLE:
                page = new MainResult();
                break;
            case constant.RESULT_IN_DIGITS:
                page = new ResultInDigits();
                break;
            case constant.GRAPHIC:
                page = new Graphic();
                break;
            case constant.TABLE:
                page = new Table();
                break;
            case constant.BONUS:
                page = new Bonus();
                break;
            default:
                break;
        }
        page.type = type;
        return page;
    }
}

const Page = new PageFactory();
export default Page;