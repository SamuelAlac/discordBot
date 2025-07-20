const { createStuffDocumentsChain } = require('langchain/chains/combine_documents')
const { createRetrievalChain } = require('langchain/chains/retrieval')

const { model, prompt } = require('./llm');
const { createVectorStore } = require('./vectorStore');

const createChain = async () =>{
    try{
        const chain = await createStuffDocumentsChain({
            llm: model,
            prompt,
        });
        const retriever = await createVectorStore()
        const retrievalChain = await createRetrievalChain({
            combineDocsChain: chain,
            retriever,
        })

        return retrievalChain;

    }catch(err){
        console.log(err);
    }
};

module.exports = { createChain };