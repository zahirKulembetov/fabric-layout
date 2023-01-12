// import Fabric from "./class/Canvas/Canvas.js";
import PageI from "./class/Page/Page.js";
import Slider from "./class/Slider/Slider.js";
import Report from "./class/Report/Report.js";

document.addEventListener('DOMContentLoaded', () => {
    const slider = new Slider({
        slider: '.canvas-list',
        buttonPrev: '.btn--prev',
        buttonNext: '.btn--next',
        activeClass: 'canvas-list-elem--active'
    });
    const report = new Report();
    const page = new PageI({
        title: {
            text: 'ОТЧЁТ О\nПОИСКОВОМ\nПРОДВИЖЕНИИ',
            left: 40,
            top: 343, 
            fill: '#3e2e88', 
            fontSize: 60 
        }
    });
    slider.onChangeSlide((activeSlideIdx, activeSlide, prevSlide) => {
        prevSlide.src = page.getCanvasAsImage();
    })
    // const page = new Page({selection: false});
    // const FabricInstance = new Fabric({selection: false});
    // page.addShape({type: 'rect', width: 200, height: 200, left: 50, top: 50, fill: '#3e2e88'})
    // page.addText({text: `ОТЧЁТ О\nПОИСКОВОМ\nПРОДВИЖЕНИИ`, left: 40, top: 343, fill: '#3e2e88', fontSize: 60});
})