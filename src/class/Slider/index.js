import SliderWithDragNDrop from "./SliderWithDragNDrop.js";

const slider = new SliderWithDragNDrop({
    slider: '.canvas-list',
    buttonPrev: '.btn--prev',
    buttonNext: '.btn--next',
    activeClass: 'canvas-list-elem--active'
});

export default slider;