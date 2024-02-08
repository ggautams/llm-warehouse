import {getAvailableModels} from "./api";
import ReactDOMServer from 'react-dom/server';

export async function getListOfModelNames() {
    const models = await getAvailableModels();
    return models["models"].map(modelInfo => modelInfo.name);
}

export function convertToHTML(rawString) {
    rawString = rawString.replace(/ /g, '&nbsp;').replace(/\n/g, '<br>');
    return rawString;
}

export function manageHistory() {

}




