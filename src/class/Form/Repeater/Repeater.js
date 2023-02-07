class Repeater {
    constructor(opt) {
        this.max = opt?.max || 5;
        this.inputs = [];
        this.idx = 0;
    }

    createField = (opt) => {
        this.inputs = opt?.inputs || this.inputs;
        if(this.idx === this.max) return;
        const inputsHtml = this._createInputs(this.inputs)
        const html = `
            <div class="repeater-row">
                ${inputsHtml}
                ${this.idx === 0 ? '<button type="button" class="repeater-row-button">+</button>' : ''}
            </div>
        `;
        this.idx+=1;

        return html;
    }

    setMaxRow(number) {
        if(number > 0) {
            this.max = number;
        }
    }

    _createInputs = (inputs) => {
        let html = "<div class='repeater-inputs-container'>";
        inputs.forEach(({type, text}, idx) => html+=`
            <div class='repeater-input-container'>
                <label id="repeater-field-${this.idx}-${idx}">${text}</label>
                <input id="repeater-field-${this.idx}-${idx}" type="${type}" name="repeater-field-${this.idx}-${idx}"/>
            </div>
        ` )
        html+="</div>"
        return html;
    }
}

export default Repeater;