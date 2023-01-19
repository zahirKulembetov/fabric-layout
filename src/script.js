// import Fabric from "./class/Canvas/Canvas.js";
import Slider from "./class/Slider/Slider.js";
import Report from "./class/Report/Report.js";
import pageFactory from "./class/Page/PageFactory.js"

document.addEventListener('DOMContentLoaded', () => {
    const slider = new Slider({
        slider: '.canvas-list',
        buttonPrev: '.btn--prev',
        buttonNext: '.btn--next',
        activeClass: 'canvas-list-elem--active'
    });
    const report = new Report(pageFactory);

    slider.onChangeSlide((activeSlideIdx, activeSlide, prevSlide) => {
        report.JSONToCanvas(activeSlideIdx); //rename function and rewrite with two type: edit and add
    })

    report.onSavePage((page) => {
        slider.addSlide();
    })

})