import FirstPage from "../TypePage/FirstPage.js";
import constant from "../../constant/constant.js"
import canvasCreator from "../Canvas/Canvas.js";

class PageFactory {
    create(type) {
        let page;
        switch(type) {
            case constant.FIRST:
                page = new FirstPage(canvasCreator);
                break;
            case constant.TITLE:
                page = new FirstPage(canvasCreator);
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