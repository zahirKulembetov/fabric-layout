class Events {
    constructor() {
        this.events = new Map();
    }

    subscribe(event, cb) {
        this.events[event] = this.events[event] || new Set();
        this.events[event].add(cb);
    }

    unsubscribe(event, cb) {
        if(this.events[event].has(cb)) {
            this.events[event].delete(cb);
        }
    }

    notify = (event, ...args) => {
        for(let cb of this.events[event]) {
            cb(...args)
        }
    }
}

const events = new Events();

export default events;