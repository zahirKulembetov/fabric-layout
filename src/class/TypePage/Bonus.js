import Page from "../Page/Page.js";

class Bonus extends Page {
    constructor() {
        super();
        this.build();
    }

    build() {
        this.info['images'] = [ 
            {source: "src/image/rub.png", left: 250, top: 350, width: 100, height: 100}, 
            {source: "src/image/rub.png", left: 600, top: 350, width: 100, height: 100}, 
            {source: "src/image/rub.png", left: 720, top: 350, width: 100, height: 100}, 
            {source: "src/image/rub.png", left: 840, top: 350, width: 100, height: 100},
         ]
        this.info['text'] = [
            {text: '100.000Р', left: 200, top: 500, fill: '#3e2e88', fontSize: 28, textAlign: 'center', width: 200},
            {text: '300.000Р', left: 600, top: 500, fill: '#3e2e88', fontSize: 28, textAlign: 'center', width: 350},
            {text: '3 месяца', left: 1100, top: 500, fill: '#3e2e88', fontSize: 28, textAlign: 'center', width: 200},
            {text: 'Ваш платёж', left: 200, top: 700, fill: '#ffffff', fontSize: 24, textAlign: 'center', width: 270},
            {text: 'Платёж приведенного клиента', left: 600, top: 700, fill: '#ffffff', fontSize: 24, textAlign: 'center', width: 270},
            {text: 'Бесплатно вы получаете', left: 1100, top: 700, fill: '#ffffff', fontSize: 24, textAlign: 'center', width: 270}
        ]
        this.info['figure'] = [
            {type: 'rect', width: 270, height: 80, left: 200, top: 700, fill: '#3e2e88'},
            {type: 'rect', width: 270, height: 80, left: 600, top: 700, fill: '#3e2e88'},
            {type: 'rect', width: 270, height: 80, left: 1100, top: 700, fill: '#3e2e88'}
        ]
        this.info['logo'] = ['logo'];
        this.info['title'] = ['Бонусная система']
    }

    createForm() {
        const html = `
           
        `;
        return html;
    }

}

export default Bonus;