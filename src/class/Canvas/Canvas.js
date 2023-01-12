//rename to PAGE maybe singleton? because can use without extends Page class

class Page {
    constructor() {
        this.canvas = new fabric.Canvas('page');
        this.canvas.selection = false;
        this.copiedElement = null;

        this.saveAsImageButton = document.querySelector('.save-as-image');
        this.deleteElementButton = document.querySelector('.delete-button');
        this.imageLoaderButton = document.querySelector('.image-loader-button');
        this.copyElementButton = document.querySelector('.copy-element');
        this.pasteElementButton = document.querySelector('.paste-element');

        this.saveAsImageButton.addEventListener('click', this.#saveAsImage);
        this.deleteElementButton.addEventListener('click', this.#deleteElement);
        this.imageLoaderButton.addEventListener('change', this.#uploadImage);
        this.copyElementButton.addEventListener('click', this.#copyElement);
        this.pasteElementButton.addEventListener('click', this.#pasteElement)
        window.addEventListener('keydown', this.#keyPress)
    }



    addText(options) {
        const {text, left, top, fill, fontSize} = options;
        const textForCanvas = new fabric.Text(text, {left, top, fill, fontSize});
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

    addGraphic() {

    }

    addTable() {

    }

    addImage(options) {
        const {source, left, top} = options;
        console.log(source)
        fabric.Image.fromURL(source, (image) => {
            image.set({left, top})
            this.canvas.add(image)
        })
        return this;
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
        if(e.keyCode === 46 || e.keyCode === 8) {
            this.#deleteElement();
        }
        if(e.ctrlKey && e.keyCode === 67) {
            this.#copyElement();
        }
        if(e.ctrlKey && e.keyCode === 86) {
            this.#pasteElement();
        }
    }

    #saveAsJSON = () => {

    }
}

export default Page;