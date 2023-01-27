// import Fabric from "./class/Canvas/Canvas.js";
import Slider from "./class/Slider/Slider.js";
import Report from "./class/Report/Report.js";
import pageFactory from "./class/Page/PageFactory.js"
import canvasCreator from "./class/Canvas/Canvas.js";
import setImageToSlide from "./class/utils/imageSlide.js";
import SliderWithDragNDrop from "./class/Slider/SliderWithDragNDrop.js";

document.addEventListener('DOMContentLoaded', () => {
    const slider = new SliderWithDragNDrop({
        slider: '.canvas-list',
        buttonPrev: '.btn--prev',
        buttonNext: '.btn--next',
        activeClass: 'canvas-list-elem--active'
    });
    const report = new Report(pageFactory, canvasCreator);

    slider.onChangeSlide((activeSlideIdx, _activeSlide, prevSlide, prevSlideIdx) => {
        report.JSONToCanvas(activeSlideIdx); //rename function 
        
        const image = report.getPageByIndex(prevSlideIdx);
        if(!image) return;
        setImageToSlide(prevSlide, image['image']);

    })

    slider.afterDrag((indexMatch) => {
        //change order in report pages !!!
        console.log(indexMatch)
    })

    report.onSavePage((page) => {
        slider.addSlide();
    })

})