import events from "../Events/Event.js"


class KeyEvent {
    constructor() {
        window.addEventListener('keydown', this.#detectKey)
    }

    #detectKey(e) {
        console.log('key')
        if(e.keyCode === 46) {
            events.notify('key.delete')
        }
        if(e.ctrlKey && e.keyCode === 67) {
            events.notify('key.ctrl+c')
        }
        if(e.ctrlKey && e.keyCode === 86) {
            events.notify('key.ctrl+v')
        }
    }
}

const keyEvents = new KeyEvent();

export default keyEvents;