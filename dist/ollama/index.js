import 'dotenv/config';
import { ChatOllama } from 'langchain/chat_models/ollama';
import { StringOutputParser } from 'langchain/schema/output_parser';
// import { ChatPromptTemplate } from 'langchain/prompts'
export const ollamaPrompt = async (diff) => {
    const model = new ChatOllama({
        baseUrl: process.env.OLLAMA_URL,
        model: process.env.OLLAMA_MODEL,
    });
    const stream = await model
        .pipe(new StringOutputParser())
        .stream(`You are an expert programmer writing the description of a pull request. Please describe in plain text the changes to the following code: ${diff}.`);
    const chunks = [];
    for await (const chunk of stream) {
        chunks.push(chunk);
    }
    const response = chunks.join('');
    console.log(response);
    return response;
};
