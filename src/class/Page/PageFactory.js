import First from "../TypePage/First.js";
import constant from "../../constant/constant.js"
import canvasCreator from "../Canvas/Canvas.js";
import MainResult from "../TypePage/MainResult.js";

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
            default:
                break;
        }
        page.type = type;
        return page;
    }
}

const Page = new PageFactory();
export default Page;