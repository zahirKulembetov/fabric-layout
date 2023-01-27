import Slider from "./Slider.js";

class SliderWithDragNDrop extends Slider {
    #activeDragElement = null;
    constructor(options) {
        super(options);
        this.#setListenerForDrag();
    }

    addSlide() {
        super.addSlide();
        this.#setDraggable();
    }

    afterDrag(cb){
        if(this._callbacks['afterdrag']) {
            this._callbacks['afterdrag'].push(cb)
        } else {
            this._callbacks['afterdrag'] = [cb];
        }
    }
  
    #setDraggable() {
        this.sliderElem.forEach(elem => elem.draggable = true)
        console.log(this.sliderElem)
    }

    #setListenerForDrag() {
        this.slider.addEventListener('dragstart', (evt) => {
            this.#activeDragElement = evt.target;
        });
        this.slider.addEventListener('dragend', (evt) => {
            this.#activeDragElement = null;
        })
        this.slider.addEventListener('dragover', (evt) => {
            evt.preventDefault();
            const currentElement = evt.target;
            
            const isMoveable = this.#activeDragElement !== currentElement && currentElement.classList.contains('canvas-list-elem');
            if(!isMoveable) return;
            const nextElement = this.#getNextElement(evt.clientY, currentElement);
            this.slider.insertBefore(this.#activeDragElement, nextElement);
            // console.log(currentElement, this.#activeDragElement, this.#activeDragElement.nextElementSibling)
            this.#recreateContainerElement()
        })
    }

    #getNextElement(cursorPosition, currentElement) {
        const currentElementCoord = currentElement.getBoundingClientRect();
        const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;
        const nextElement = (cursorPosition < currentElementCenter) ?
            currentElement :
            currentElement.nextElementSibling;
        return nextElement;
    }

    #recreateContainerElement = () => {
        const changeElementIdx = {};
        
        this.sliderElem = [...this.slider.children];
        this.sliderElem.forEach((element, idx) => {
            const oldIdx = element.getAttribute('data-page');
            changeElementIdx[oldIdx] = idx;
            element.setAttribute('data-page', idx);
        });
        this._executeCallbacks('afterdrag', changeElementIdx)

    }
}

export default SliderWithDragNDrop;