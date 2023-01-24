import constant from "../../constant/constant.js";

//rename to PAGE maybe singleton? because can use without extends Page class

export class Canvas {
    #callbacks;
    constructor() {
        this.canvas = new fabric.Canvas('page');
        this.canvas.selection = false;

        this.copiedElement = null;

        this.saveAsImageButton = document.querySelector('.save-as-image');
        this.saveAsJsonButton = document.querySelector('.save-as-json');

        this.deleteElementButton = document.querySelector('.delete-button');
        this.imageLoaderButton = document.querySelector('.image-loader-button');
        this.copyElementButton = document.querySelector('.copy-element');
        this.pasteElementButton = document.querySelector('.paste-element');

        this.saveAsImageButton.addEventListener('click', this.#saveAsImage);
        this.saveAsJsonButton.addEventListener('click', this.saveAsJSON);

        this.deleteElementButton.addEventListener('click', this.#deleteElement);
        this.imageLoaderButton.addEventListener('change', this.#uploadImage);
        this.copyElementButton.addEventListener('click', this.#copyElement);
        this.pasteElementButton.addEventListener('click', this.#pasteElement)
        window.addEventListener('keydown', this.#keyPress)

        this.addGraphic();
    }



    addText(options) {
        const {text, left, top, fill, fontSize, textAlign, width, height} = options;
        const textForCanvas = new fabric.Textbox(text, {left, top, fill: fill ?? '#000', fontSize: fontSize ?? 16, textAlign: textAlign ?? 'left', width: width ?? 1440});
        this.canvas.add(textForCanvas);
        return this;
    }


    addShape(options) {
        console.log(options)
        const {type, width, height, left, top, fill} = options;
        if(type === 'rect') this.canvas.add(new fabric.Rect({
            width, height, left, top, fill
        }))
        return this;
    }
    

    addImage(options) {
        const {source, left, top} = options;
        fabric.Image.fromURL(source, (image) => {
            image.set({left, top})
            this.canvas.add(image)
        })
        return this;
    }
    
    getImage() {
        return  this.canvas.toDataURL({
            format: 'png',
            quality: 1
        });
    }

    getCanvasAsImage() {
        return this.canvas.toDataURL({
            format: 'png',
            quality: 1
        })
    }

    //CALLBACK

    #copyElement = (e) => {
        const activeElement = this.canvas.getActiveObject();
        if(!activeElement) return
        console.log(this.canvas.getActiveObject())
        const copyActiveElement = fabric.util.object.clone(activeElement);
        this.copiedElement = copyActiveElement;
    }

    #extendFabricImageToObject = () => {
        // fabric.Image.prototype.toDatalessObject = fabric.Image.prototype.toObject;
        // fabric.Image.prototype.toObject = (function(toObject) {
        //     return function() {
        //       return fabric.util.object.extend(toObject.call(this), {
        //         src: this.toDataURL()
        //       });
        //     };
        //   })(fabric.Image.prototype.toObject);
    }

    // implementation
    addGraphic(options) {
        this.#drawCoordSystem();
        // maxValue, countElements
        this.#addSeparatorToOY(7000, 7);
        this.#addColumn(7000, 7);
        // this.#addText();
    }

    addLine() {

    }
    

    // implementation
    addTable(options) {
        // this.#addRow();
    }

     // implementation
    addList(options) {

    }

    #addSeparatorToOY(maxValue, countElements) {
        //HEIGHT_OF_GRAPHIC
        const step = Math.floor( constant.HEIGHT_OF_GRAPHIC / countElements);
        const numberToStep = Math.round(maxValue / countElements);
        for(let i = 0; i <= countElements; i++) {
            const currentNumber = numberToStep * i;
            // {text, left, top, fill, fontSize, textAlign, width}
            this.addText({text: `${currentNumber}`, left: 30, top: constant.HEIGHT_OF_GRAPHIC + constant.START_GRAPHIC_Y - (step * i), width: 30, textAlign: 'right'}); 
            this.canvas.add(new fabric.Line([0, 100, constant.WIDTH_OF_GRAPHIC - 40, 100], {
                left: 70,
                top: constant.HEIGHT_OF_GRAPHIC + constant.START_GRAPHIC_Y - (step * i),
                stroke: '#D5CCFE',
                strokeWidth: 2
            }))
        }
    }

    #addColumn(maxValue, countElements) {
        let startX = 80;
        const data = [
            {
                value:2794,
                date: 'Январь'
            },
            {
                value: 4049,
                date: 'Февраль'
            },
            {
                value: 5732,
                date: 'Март'
            },
        ]
        const margin = 70;
        const height = constant.HEIGHT_OF_GRAPHIC;
        //coef for relation px
        console.log(data.length)
        const stepH = height / maxValue;
        const marginStep = margin  / data.length;
        //minus left part before start coords
        const widthElem = (constant.WIDTH_OF_GRAPHIC - margin - 60) / (data.length);
        // {type, width, height, left, top, fill} \
       
        // this.addShape({type: 'rect', width: widthElem, height: 200 * stepH, left: 80 + widthElem + 10, top: constant.HEIGHT_OF_GRAPHIC + constant.START_GRAPHIC_Y - 200 * stepH, fill: '#3e2e88'})
        for(let i = 0; i < data.length; i++) {
            const value = data[i].value * stepH;
            this.addShape({type: 'rect', width: widthElem, height: value, left: startX, top: constant.HEIGHT_OF_GRAPHIC + constant.START_GRAPHIC_Y - value, fill: '#3e2e88'});
            this.#addTextUnderColumn({text: data[i].date, width: widthElem, left: startX, top: constant.HEIGHT_OF_GRAPHIC + constant.START_GRAPHIC_Y });
            //center for inside element
            this.#addTextIntoColumn({text: data[i].date, width: widthElem, left: startX, top: value })
            startX += widthElem + marginStep;
        }
    
    }

    #addTextUnderColumn(options) {
        const {text, width, left, top} = options;
        this.addText({text, width, left, top, textAlign: 'center', fontSize: 20});
    }

    #addTextIntoColumn(options) {
        const {text, width, left, top} = options;
        this.addText({text, width, left, top, textAlign: 'center', fontSize: 20});
    }

    #drawCoordSystem(options) {
        // const {x, y} = options;
        //x y x1 y1
        //constant.HEIGHT_OF_GRAPHIC + 100 
        //Начало координат сверху вниз, поэтому от точки с x y задаем длину, поэтому необходимо учитывать отступ сверху 
        const group = new fabric.Group();
        console.log(group)
        const OX = new fabric.Line([0, 100, constant.WIDTH_OF_GRAPHIC - 30, 100], {
            left: 80,
            top: constant.HEIGHT_OF_GRAPHIC + constant.START_GRAPHIC_Y,
            stroke: '#D5CCFE',
            strokeWidth: 2
        })

        const OY = new fabric.Line([0, 0, 0, constant.HEIGHT_OF_GRAPHIC], {
            left: 80,
            top: constant.START_GRAPHIC_Y,
            stroke: '#D5CCFE',
            strokeWidth: 2
        })
        group.add(OX)
        group.addWithUpdate(OY);
        this.canvas.add(group);
    }

    #pasteElement = (e) => {
        if(!this.copiedElement) return
        this.copiedElement.set('top',  this.copiedElement.top + 5)
        this.copiedElement.set('left',  this.copiedElement.left + 5)
        this.canvas.add(this.copiedElement);
        this.canvas.setActiveObject(this.copiedElement);
        this.#copyElement();
    }

    #deleteElement = () => {
        this.canvas.remove(this.canvas.getActiveObject());
    }

    #saveAsImage = (e) => {
        const link = e.target;
        link.href = this.canvas.toDataURL({
            format: 'png',
            quality: 1
        })
        link.download = 'canvas.png'
    }

    #uploadImage = (e) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const imageInstance = new Image();
            imageInstance.src = event.target.result;
            imageInstance.onload = () => {
                const image = new fabric.Image(imageInstance);
                image.set({
                    angle: 0
                })
                this.canvas.centerObject(image);
                this.canvas.add(image);
                this.canvas.renderAll();
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    #keyPress = (e) => {
        if(e.keyCode === 46) {
            this.#deleteElement();
        }
        if(e.ctrlKey && e.keyCode === 67) {
            this.#copyElement();
        }
        if(e.ctrlKey && e.keyCode === 86) {
            this.#pasteElement();
        }
    }
//https://stackoverflow.com/questions/51434198/include-image-data-in-json-fabricjs
    saveAsJSON = () => {
        console.log(this.canvas.getObjects())
        return this.canvas.toJSON();
    }

    JSONToCanvas = (json) => {
        this.canvas.loadFromJSON(json, () => {
            console.log('render')
            this.canvas.renderAll();
        }, (o, obj) => {
            console.log(o)
            console.log(obj)
        })
    }

    clear = () => {
        this.canvas.clear()
    }
}

const canvasCreator = new Canvas();
export default canvasCreator;