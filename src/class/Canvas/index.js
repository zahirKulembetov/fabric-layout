import Canvas from './Canvas.js';
import FormFactory from "../Form/FormFactory.js";
import ModalWithForm from "../Modal/ModalWithForm.js";

const canvasCreator = new Canvas(new ModalWithForm({
    modal: '#modal',
    active: 'modal-open'
}, FormFactory));

const saveAsImageButton = document.querySelector('.save-as-image');
const saveAsJsonButton = document.querySelector('.save-as-json');
const deleteElementButton = document.querySelector('.delete-button');
const imageLoaderButton = document.querySelector('.image-loader-button');
const copyElementButton = document.querySelector('.copy-element');
const pasteElementButton = document.querySelector('.paste-element');
const canvasSchema = document.querySelector('.manage-canvas-schema');



saveAsImageButton.addEventListener('click', canvasCreator.saveAsImage);
saveAsJsonButton.addEventListener('click', canvasCreator.saveAsJSON);
canvasSchema.addEventListener('click', canvasCreator.detectTypeModal)
deleteElementButton.addEventListener('click', canvasCreator.deleteElement);
imageLoaderButton.addEventListener('change', canvasCreator.uploadImage);
copyElementButton.addEventListener('click', canvasCreator.copyElement);
pasteElementButton.addEventListener('click', canvasCreator.pasteElement);

export default canvasCreator;