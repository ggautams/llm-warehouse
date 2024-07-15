import {getAvailableModels} from "./api";

export async function getListOfModelNames() {
    const models = await getAvailableModels();
    return models["models"].map((modelInfo: { name: string; }) => modelInfo.name);
}

export function convertToHTML(rawString: string) {
    rawString = rawString.replace(/ /g, '&nbsp;').replace(/\n/g, '<br>');
    return rawString;
}

export function manageHistory() {

}



