class Slider {
    #callbacks = null;
    #prevSlide = null;
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

        this.#callbacks = {};
        this.#setActiveSlideElem(this.activeSlide);
        this.#sliderContainerClass = sliderClass;

        this.nextButton.addEventListener('click', this.#toNextSlide);
        this.prevButton.addEventListener('click', this.#toPrevSlide);
        this.slider.addEventListener('click', this.#handlerSliderListener)
    }

    addSlide() {
        this.#addNodeToNode();
        this.#toNextSlide();
    }

    getActiveSlide() {
        return this.activeSlide;
    }

    setActiveSlide(numberSlide) {
        this.activeSlide = numberSlide;
    }

    onChangeSlide(cb) {
        if(this.#callbacks['change-slide']) {
            this.#callbacks['change-slide'].push(cb)
        } else {
            this.#callbacks['change-slide'] = [cb];
        }
    }

    #executeCallbacks = (type) => {
        if(this.#callbacks[type]) {
            this.#callbacks[type].forEach(cb => cb(this.activeSlide, this.sliderElem[this.activeSlide], this.sliderElem[this.#prevSlide]));
        }
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
                this.#goToSlide(numberPage);
            }
        } 
    }

    #setActiveSlideElem(numberSlide) {
        this.sliderElem[numberSlide].classList.add(this.activeClass);
    }

    #setInActiveSlideElem(numberSlide) {
        this.sliderElem[numberSlide].classList.remove(this.activeClass);
    }

    #goToSlide(idx) {
        this.#setInActiveSlideElem(this.activeSlide);
        //prev slide set if need
        this.setActiveSlide(idx);
        this.#setActiveSlideElem(idx);
        this.#executeCallbacks('change-slide');
    }

    #toNextSlide = () => {
        if(!this.countElemOfSlider) return
        this.#setInActiveSlideElem(this.activeSlide);
        this.#prevSlide = this.activeSlide;
        if(this.activeSlide === this.countElemOfSlider) {
            this.setActiveSlide(0);
        } else {
            this.setActiveSlide(this.activeSlide + 1);
        }
        this.#setActiveSlideElem(this.activeSlide);
        this.#executeCallbacks('change-slide')
    }

    #toPrevSlide = () => {
        if(!this.countElemOfSlider) return
        this.#setInActiveSlideElem(this.activeSlide);
        this.#prevSlide = this.activeSlide;
        if(this.activeSlide === 0) {
            this.setActiveSlide(this.countElemOfSlider);
        } else {
            this.setActiveSlide(this.activeSlide - 1);
        }
        this.#setActiveSlideElem(this.activeSlide);
        this.#executeCallbacks('change-slide')
    }

}


export default Slider;