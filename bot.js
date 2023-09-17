import { config } from "dotenv";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { CharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { FaissStore } from "langchain/vectorstores/faiss";
import { OpenAI } from "langchain/llms/openai";
import { RetrievalQAChain, loadQAStuffChain } from "langchain/chains";

config();

async function initializeBot() {
    const loader = new TextLoader("./ecommerce.txt");
    const docs = await loader.load();

    const splitter = new CharacterTextSplitter({
        chunkSize: 200,
        chunkOverlap: 50,
    });

    const documents = await splitter.splitDocuments(docs);

    const embeddings = new OpenAIEmbeddings();
    const vectorstore = await FaissStore.fromDocuments(documents, embeddings);
    await vectorstore.save("./");

    const model = new OpenAI({ temperature: 0 });

    const chain = new RetrievalQAChain({
        combineDocumentsChain: loadQAStuffChain(model),
        retriever: vectorstore.asRetriever(),
        returnSourceDocuments: true,
    });

    return chain;
}

const chainPromise = initializeBot();

export default chainPromise;
