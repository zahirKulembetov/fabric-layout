// import Fabric from "./class/Canvas/Canvas.js";

import setImageToSlide from "./class/utils/imageSlide.js";
import changeOrderArray from "./class/utils/changeOrderArray.js";
import report from "./class/Report/index.js";
import slider from "./class/Slider/index.js";
import keyEvents from "./class/Listeners/keyEvents.js";

document.addEventListener('DOMContentLoaded', () => {

    slider.onChangeSlide((activeSlideIdx, _activeSlide, prevSlide, prevSlideIdx) => {
        report.JSONToCanvas(activeSlideIdx); //rename function 
        const image = report.getPageByIndex(prevSlideIdx);
        if(!image) return;
        setImageToSlide(prevSlide, image['image']);
    })

    slider.afterDrag((indexMatch) => {
        changeOrderArray(report.getPages(), indexMatch);
    })

    report.onSavePage((page) => {
        slider.addSlide();
    })

    report.onDeletePage((pageIdx) => {
        slider.deletePage(pageIdx)
    })

    
})