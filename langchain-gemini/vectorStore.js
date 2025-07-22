const { RecursiveCharacterTextSplitter } = require('langchain/text_splitter')
const { CohereEmbeddings } = require('@langchain/cohere')
const { MemoryVectorStore } = require('langchain/vectorstores/memory')
const { webLoader } = require('./loader')

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 200,
    chunkOverlap: 20,
})

const embeddings = new CohereEmbeddings({
    model: 'embed-english-v3.0'
})

const createVectorStore = async () =>{
    const docs = await loader.load();
    const splitDocs = await splitter.splitDocuments(docs);

    const vectorStore = await MemoryVectorStore.fromDocuments(splitDocs, embeddings);

    const retriever = vectorStore.asRetriever({
        k:2,
    });

    return retriever;
}

module.exports = { createVectorStore };