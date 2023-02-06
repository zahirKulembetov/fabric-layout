import Report from './Report.js';
import pageFactory from "../../class/Page/PageFactory.js"
import canvasCreator from "../../class/Canvas/index.js";


const report = new Report(pageFactory, canvasCreator);

const savePageButton = document.querySelector('.button-save-page')
const saveChangesButton = document.querySelector('.button-save-changes');
const deletePageButton = document.querySelector('.button-delete-page');
const typePage = document.querySelector('#page-type');
const typeLayout = document.querySelector('#layout');

savePageButton.addEventListener('click', report.savePageHandler)
saveChangesButton.addEventListener('click', report.editPage)
deletePageButton.addEventListener('click', report.deletePage)
typePage.addEventListener('change', report.detectTypePage);
typeLayout.addEventListener('change', report.detectTypeLayout)

export default report;