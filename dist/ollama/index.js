import 'dotenv/config';
export const ollamaPrompt = async (prompt) => {
    const url = `${process.env.OLLAMA_URL}/api/generate`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "model": process.env.OLLAMA_MODEL,
            "prompt": prompt,
            "stream": false
        })
    });
    return response;
};
