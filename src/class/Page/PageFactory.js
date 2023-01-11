import FirstPage from "../TypePage/FirstPage.js";

class PageFactory {
    create(type) {
        let page;
        switch(type) {
            case 'first':
                page = new FirstPage();
                break;
            default:
                break;
        }
        page.type = type;
        console.log(page.type)
    }
}

const Page = new PageFactory();
export default Page;