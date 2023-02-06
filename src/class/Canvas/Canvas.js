import constant from "../../constant/constant.js";

import prepareFormGraphic from "../utils/prepareFormGraphic.js";

//rename to PAGE maybe singleton? because can use without extends Page class

//Button add text and choose fontSize
//Text on graphic under column with angle
//Add empty page with functions for custom create page!!!!
//Add layout with orange blocks and user choice

//Class Canvas panel !!!!
//Class canvas only contains draw methods other methods include cavnas panel!!!

class Canvas {
    constructor(modal) {
        this.canvas = new fabric.Canvas('page');
        this.canvas.selection = false;
        this.modal = modal;
        this.copiedElement = null;
        this.#onModalSubmit();
        window.addEventListener('keydown', this.#keyPress)
    }



    addText(options) {
        const {text, left, top, fill, fontSize, textAlign, width, height, angle = 0} = options;
        const textForCanvas = new fabric.Textbox(text, {left, top, fill: fill ?? '#000', fontSize: fontSize ?? 16, textAlign: textAlign ?? 'left', width: width ?? 1360, angle});
        this.canvas.add(textForCanvas);
        return this;
    }


    addShape(options) {
        const {type, width, height, left, top, fill, selectable = true, back = true} = options;
        if(type === 'rect') {
            console.log(selectable)
            const rect = new fabric.Rect({
                width, height, left, top, fill, selectable
            });
            this.canvas.add(rect)
            if(back) this.canvas.sendToBack(rect);
        } 
        return this;
    }
    

    addImage(options) {
        const {source, left = 0, top = 0, width, height, back = false} = options;
        fabric.Image.fromURL(source, (image) => {
            image.set({left, top})
            if(width) {
                image.scaleToWidth(width);
            }
            if(height) {
                image.scaleToHeight(height);
            }
            this.canvas.add(image)
            if(back) this.canvas.sendToBack(image)
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

    copyElement = (e) => {
        const activeElement = this.canvas.getActiveObject();
        if(!activeElement) return
        console.log(this.canvas.getActiveObject())
        const copyActiveElement = fabric.util.object.clone(activeElement);
        this.copiedElement = copyActiveElement;
    }


    addGraphic(options) {
        const {count, max, columns} = options;
        this.#drawCoordSystem();
        // maxValue, countElements
        this.#addSeparatorToOY(max, count);
        this.#addColumn(max, count, columns);
        // this.#addText();
    }

    addLine() {

    }
    


    addTable(options) {
        const {rows, percentMainColumn} = options;
        this.#addRow({rows, percentMainColumn});
    }

    addList(options) {
        const margin = 30;
        const {texts, left, top, startNumber, marked} = options;
        texts.forEach((text, i) => {
            const prepareSeparator = marked ? ' - ' : `${(startNumber ?? 1) + i}.  `;
            this.addText({text: `${prepareSeparator}${text}`, left, top: top + i*margin, fill: '#000000'});
        })
    }

    addLogo() {
        this.addImage({source: 'src/image/lzmedia.png', left: 1160, top: 40});
    }

    addTitle(title) {
        this.addText({text: title, left: 40, top: 40})
    }

    #addRows() {
        
    }

    #addRow(options) {
        const {percentMainColumn, rows} = options;
        //percent only first column for next columns -> (100 - percent) / (countcolumns - 1)
        const percentOtherColumns = (100 - percentMainColumn) / 2;
        const startTop = 130;
        const defaultHeight = 45;

        let marginLeft = 60;
        const fontSize = 20;
        rows.forEach(({texts}, idx) => {
            const isFirstRow = idx === 0;
            const fill = isFirstRow ? '#3e2e88': idx % 2 === 0 ? '#f7f5ff': '#ffffff';
            const marginTopRow = startTop + idx*defaultHeight
            this.addShape({type: 'rect', width: 1360, height: defaultHeight, left: 40, top: marginTopRow, fill });
            texts.forEach((text, i) => {
                const isFirst = i === 0;
                const currentPercent = isFirst ? percentMainColumn : percentOtherColumns;
                const currentAlign = isFirst ? 'left':'right';
                const currentWidth = 1360 * (currentPercent / 100);
                const currentTop = marginTopRow + (defaultHeight - fontSize) / 2;
                const currentFill = isFirstRow ? '#ffffff': '#000000';
                this.addText({text, left: marginLeft, top: currentTop, fontSize: 20, textAlign: currentAlign, width: currentWidth, fill: currentFill});
                marginLeft += (currentWidth - 20);
            })
            marginLeft = 60;
        })
        //count column
        //pass percent for column, example(70% -> width = 1360 * 0.7)
        //pass textAlign for column
    }
// Canvas-panel
    detectTypeModal = (e) => {
        const target = e.target;
        if(!target.classList.contains('btn')) return;
        this.modal.open();
        const type = target.getAttribute('data-type');
        this.modal.addFormType(`form-${type}`);
    }

    #onModalSubmit() {
        this.modal.onSubmit( form => {
            this.addGraphic(prepareFormGraphic(form))
        })
    }
// Canvas-panel
    #addSeparatorToOY(maxValue, countElements) {
        //HEIGHT_OF_GRAPHIC
        const step = Math.floor( constant.HEIGHT_OF_GRAPHIC / countElements);
        const numberToStep = Math.round(maxValue / countElements);
        for(let i = 0; i <= countElements; i++) {
            const currentNumber = numberToStep * i;
            // {text, left, top, fill, fontSize, textAlign, width}
            this.addText({text: `${currentNumber}`, left: 30, top: constant.HEIGHT_OF_GRAPHIC + constant.START_GRAPHIC_Y - (step * i), width: 30, textAlign: 'right'}); 
            const line = new fabric.Line([0, 100, constant.WIDTH_OF_GRAPHIC - 40, 100], {
                left: 70,
                top: constant.HEIGHT_OF_GRAPHIC + constant.START_GRAPHIC_Y - (step * i),
                stroke: '#D5CCFE',
                strokeWidth: 2,
                preserveObjectStacking: false
            });
            this.canvas.add(line)
            this.canvas.sendBackwards(line, true)
        }
    }

    #addColumn(maxValue, countElements, data) {
        let startX = 80;
        // const data = [
        //     {
        //         value:2794,
        //         date: 'Январь'
        //     },
        //     {
        //         value: 4049,
        //         date: 'Февраль'
        //     },
        //     {
        //         value: 5732,
        //         date: 'Март'
        //     }
        // ]
        const margin = 70;
        const height = constant.HEIGHT_OF_GRAPHIC;
        //coef for relation px
        const stepH = height / maxValue;
        const marginStep = margin  / data.length;
        //minus left part before start coords
        const widthElem = (constant.WIDTH_OF_GRAPHIC - margin - 60) / (data.length);
        // {type, width, height, left, top, fill} \
       
        // this.addShape({type: 'rect', width: widthElem, height: 200 * stepH, left: 80 + widthElem + 10, top: constant.HEIGHT_OF_GRAPHIC + constant.START_GRAPHIC_Y - 200 * stepH, fill: '#3e2e88'})
        for(let i = 0; i < data.length; i++) {
            const value = data[i].value * stepH;
            this.addShape({type: 'rect', width: widthElem, height: value, left: startX, top: constant.HEIGHT_OF_GRAPHIC + constant.START_GRAPHIC_Y - value, fill: '#3e2e88', back: false});
            this.#addTextUnderColumnOX({text: data[i].date, width: widthElem, left: startX, top: constant.HEIGHT_OF_GRAPHIC + constant.START_GRAPHIC_Y, countColumn: i });
            //center for inside element
            this.#addTextIntoColumn({text: `${data[i].value}`, width: widthElem, left: startX, top: (constant.HEIGHT_OF_GRAPHIC + constant.START_GRAPHIC_Y - value/2) })
            startX += widthElem + marginStep;
        }
    
    }

    #addTextUnderColumnOX(options) {
        const {text, width, left, top, countColumn} = options;
        //rotate text depend countColumn
        this.addText({text, width, left, top, textAlign: 'center', fontSize: 24});
    }

    #addTextIntoColumn(options) {
        const {text, width, left, top} = options;
        this.addText({text, width, left, top, textAlign: 'center', fontSize: 34, fill: '#fff'});
    }

    #drawCoordSystem(options) {
        // const {x, y} = options;
        //x y x1 y1
        //constant.HEIGHT_OF_GRAPHIC + 100 
        //Начало координат сверху вниз, поэтому от точки с x y задаем длину, поэтому необходимо учитывать отступ сверху 
        // const group = new fabric.Group();
        // console.log(group)
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
        // group.add(OX)
        // group.addWithUpdate(OY);
        this.canvas.add(OX);
        this.canvas.add(OY);
        this.canvas.sendToBack(OX)
        this.canvas.sendToBack(OY)
    }

    pasteElement = (e) => {
        if(!this.copiedElement) return
        this.copiedElement.set('top',  this.copiedElement.top + 5)
        this.copiedElement.set('left',  this.copiedElement.left + 5)
        this.canvas.add(this.copiedElement);
        this.canvas.setActiveObject(this.copiedElement);
        this.copyElement();
    }

    deleteElement = () => {
        this.canvas.remove(this.canvas.getActiveObject());
    }

    saveAsImage = (e) => {
        const link = e.target;
        link.href = this.canvas.toDataURL({
            format: 'png',
            quality: 1
        })
        link.download = 'canvas.png'
    }

    uploadImage = (e) => {
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
            this.deleteElement();
        }
        if(e.ctrlKey && e.keyCode === 67) {
            this.copyElement();
        }
        if(e.ctrlKey && e.keyCode === 86) {
            this.pasteElement();
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
            // console.log(o)
            // console.log(obj)
        })
    }

    clear = () => {
        this.canvas.clear()
    }
}
//Move modal to canvas panel !!!
//Canvas only draw !!!

export default Canvas;