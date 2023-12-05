import 'dotenv/config';
import { ChatOllama } from 'langchain/chat_models/ollama';
import { StringOutputParser } from 'langchain/schema/output_parser';
// import { ChatPromptTemplate } from 'langchain/prompts'
export const ollamaPrompt = async (diff) => {
    // const systemPrompt = ChatPromptTemplate.fromMessages([
    //   [
    //     "system",
    //     `You are an expert programmer. You are reviewing a pull request. You are writing the description of the pull request. Format the response as a JSON object with the key: "review"`
    //   ],
    //   [
    //     "human",
    //     `Please review this git diff: {diff}`
    //   ]
    // ])
    const model = new ChatOllama({
        baseUrl: process.env.OLLAMA_URL,
        model: 'codellama'
    });
    console.log(diff);
    const stream = await model
        .pipe(new StringOutputParser())
        .stream(`You are an expert programmer and I am passing you a git diff. Your response is intended to be the description of a pull request. Please desribe what is happening in the code: ${diff}.`);
    const chunks = [];
    for await (const chunk of stream) {
        chunks.push(chunk);
    }
    const response = chunks.join('');
    console.log(response);
    // const chain = systemPrompt.pipe(model)
    // const response = await chain.invoke({ diff: diff })
    // const response = await fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     "model": process.env.OLLAMA_MODEL,
    //     "prompt": prompt,
    //     "stream": false
    //   })
    // })
    return response;
};
