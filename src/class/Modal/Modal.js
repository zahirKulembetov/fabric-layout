class Modal {
    constructor(opt) {
        this.modal = document.querySelector(opt.modal);
        
        this.modalBody = this.modal.querySelector('.modal-body');
        this.modalHeader = this.modal.querySelector('.modal-header');
        this.modalFooter = this.modal.querySelector('.modal-footer');

        this.body = document.querySelector('body');
        this.activeClass = opt.active;
    }


    _addBody(elem) {
        this.modalBody.appendChild(elem)
    }

    _addHeader() {

    }

    _addFooter() {

    }

    open() {
        this.body.classList.add(this.activeClass);
        this.modal.addEventListener('click', this._overlayClick);
        window.addEventListener('keydown', this._keyListener);
    }

    close() {
        this.body.classList.remove(this.activeClass);
        window.removeEventListener('keydown', this._keyListener);
        this.modal.removeEventListener('click', this._overlayClick);
    }

    _overlayClick = (e) => {
        e.stopPropagation();
        const target = e.target;
        if(target.getAttribute('id') && !target.closest('.modal')) {
            this.close()
        }
    }

    _keyListener = (e) => {
        if(e.keyCode === 27) {
            this.close();
        }
    }

}

export default Modal;