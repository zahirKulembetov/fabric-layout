import events from "../Events/Event.js";

class Slider {
    _callbacks = null;
    #prevSlide = null;
    #prevIdxSlide = null;
    #sliderContainerClass = null;

    constructor(options) {
        const {slider:sliderClass, buttonNext: buttonNextClass, buttonPrev: buttonPrevClass, activeClass} = options;
        this.slider = document.querySelector(sliderClass);
        this.sliderElem = [...this.slider.children];
        this.countElemOfSlider = this.sliderElem.length - 1;
        this.nextButton = document.querySelector(buttonNextClass);
        this.prevButton = document.querySelector(buttonPrevClass);
        this.activeSlide = 0;
        this.activeClass = activeClass;

        this._callbacks = {};
        this._setActiveSlideElem(this.activeSlide);
        this.#sliderContainerClass = sliderClass;

        this.nextButton.addEventListener('click', this._toNextSlide);
        this.prevButton.addEventListener('click', this._toPrevSlide);
        this.slider.addEventListener('click', this.#handlerSliderListener)
    }

    addSlide() {
        this.#addNodeToNode();
        this._toNextSlide();
    }

    getActiveSlide() {
        return this.activeSlide;
    }

    setActiveSlide(numberSlide) {
        this.activeSlide = numberSlide;
    }

    onChangeSlide(cb) {
        events.subscribe('change-slide', cb);
    }


    deletePage(idx) {
        this.#deletePageHandler(idx);
    }

    getSlideById(id) {
        return this.sliderElem[id];
    }

    #addNodeToNode() {
        const nodeImg = document.createElement('img');
        nodeImg.classList.add('canvas-list-elem');
        this.sliderElem.push(nodeImg);
        this.slider.appendChild(nodeImg);
        this.countElemOfSlider =  this.sliderElem.length - 1;
        nodeImg.setAttribute('data-page', this.countElemOfSlider);
    }

    #handlerSliderListener = (e) => {
        const target = e.target;
        const isContainer = target.classList.contains(this.#sliderContainerClass.slice(1));
        if(!isContainer) {
            const numberPage = +target.getAttribute('data-page');
            if(numberPage !== this.activeSlide) { // if not same page
                this._goToSlide(numberPage);
            }
        } 
    }

    _setActiveSlideElem(numberSlide) {
        this.sliderElem[numberSlide].classList.add(this.activeClass);
    }

    _setInActiveSlideElem(numberSlide) {
        this.sliderElem[numberSlide].classList.remove(this.activeClass);
    }

    _goToSlide(idx) {
        this._setInActiveSlideElem(this.activeSlide);
        this.#prevSlide = this.activeSlide;
        //prev slide set if need
        this.setActiveSlide(idx);
        this._setActiveSlideElem(idx);
        events.notify('change-slide', this.activeSlide, this.sliderElem[this.activeSlide], this.sliderElem[this.#prevSlide], this.#prevSlide);
    }

    _toNextSlide = () => {
        if(!this.countElemOfSlider) return
        this._setInActiveSlideElem(this.activeSlide);
        this.#prevSlide = this.activeSlide;
        if(this.activeSlide === this.countElemOfSlider) {
            this.setActiveSlide(0);
        } else {
            this.setActiveSlide(this.activeSlide + 1);
        }
        this._setActiveSlideElem(this.activeSlide);
        events.notify('change-slide', this.activeSlide, this.sliderElem[this.activeSlide], this.sliderElem[this.#prevSlide], this.#prevSlide)
    }

    _toPrevSlide = () => {
        if(!this.countElemOfSlider) return
        this._setInActiveSlideElem(this.activeSlide);
        this.#prevSlide = this.activeSlide;
        if(this.activeSlide === 0) {
            this.setActiveSlide(this.countElemOfSlider);
        } else {
            this.setActiveSlide(this.activeSlide - 1);
        }
        this._setActiveSlideElem(this.activeSlide);
        events.notify('change-slide', this.activeSlide, this.sliderElem[this.activeSlide], this.sliderElem[this.#prevSlide], this.#prevSlide)
    }

    #deletePageHandler(idx){
        const deleleIdx = this.sliderElem.indexOf(idx);
        this.sliderElem[idx].remove();
        this.sliderElem.splice(deleleIdx, 1);
        this.countElemOfSlider -=1;
        this._toPrevSlide();
        this._changeDataPage();
    }

    _changeDataPage() {
        this.sliderElem = [...this.slider.children];
        this.sliderElem.forEach((element, idx) => element.setAttribute('data-page', idx));
    }

}


export default Slider;