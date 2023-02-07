import Canvas from './Canvas.js';
import FormFactory from "../Form/FormFactory.js";
import ModalWithForm from "../Modal/ModalWithForm.js";
import events from '../Events/Event.js';

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
const addTextButton = document.querySelector('.btn-add-text');
const choseColor = document.querySelector('#color');
const choseFontSize = document.querySelector('#fontSize');

addTextButton.addEventListener('click', canvasCreator.addText)
saveAsImageButton.addEventListener('click', canvasCreator.saveAsImage);
saveAsJsonButton.addEventListener('click', canvasCreator.saveAsJSON);
canvasSchema.addEventListener('click', canvasCreator.detectTypeModal)
deleteElementButton.addEventListener('click', canvasCreator.deleteElement);
copyElementButton.addEventListener('click', canvasCreator.copyElement);
pasteElementButton.addEventListener('click', canvasCreator.pasteElement);

imageLoaderButton.addEventListener('change', canvasCreator.uploadImage);
choseColor.addEventListener('change', canvasCreator.setColor);
choseFontSize.addEventListener('change', canvasCreator.setFontSize)

events.subscribe('key.delete', canvasCreator.deleteElement)
events.subscribe('key.ctrl+c', canvasCreator.copyElement)
events.subscribe('key.ctrl+v', canvasCreator.pasteElement)


export default canvasCreator;