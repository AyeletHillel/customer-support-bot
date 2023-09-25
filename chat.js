import { config } from "dotenv";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import * as fs from "fs";
config();

async function initializeChain() {
    const textLoader = fs.readFileSync("ecommerce.txt", "utf8");

    const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
    const docs = await textSplitter.createDocuments([textLoader]);

    const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());

    const model = new ChatOpenAI({
        modelName: "gpt-3.5-turbo",
    });

    const chain = ConversationalRetrievalQAChain.fromLLM(
        model,
        vectorStore.asRetriever(),     
        {
            returnSourceDocuments: true,
            questionGeneratorChainOptions: {
                llm: model,
                template: "You are a customer support assistant for an online store. Your primary role is to provide accurate information, resolve issues, and ensure a positive shopping experience for the users. Always prioritize clarity and helpfulness in your responses.",
            },
        }
    );

    return chain;
}

const chainPromise = initializeChain();

export default chainPromise;
