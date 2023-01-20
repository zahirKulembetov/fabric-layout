import First from "../TypePage/First.js";
import constant from "../../constant/constant.js"
import canvasCreator from "../Canvas/Canvas.js";
import MainResult from "../TypePage/MainResult.js";
import ResultInDigits from "../TypePage/ResultInDigits.js";


//each page extend from main page, which contain main function, like this:
//addTitle()
//addLogo()
//addNumberPage()

class PageFactory {
    create(type) {
        let page;
        switch(type) {
            case constant.FIRST:
                page = new First(canvasCreator);
                break;
            case constant.TITLE:
                page = new MainResult(canvasCreator);
                break;
            case constant.RESULT_IN_DIGITS:
                page = new ResultInDigits(canvasCreator);
            default:
                break;
        }
        page.type = type;
        return page;
    }
}

const Page = new PageFactory();
export default Page;