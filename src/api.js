const BaseUrl = process.env.REACT_APP_OLLAMA_HOST;

export async function getAvailableModels() {
    const response = await fetch(`${BaseUrl}/api/tags`);
    return await response.json();
}
