const { createChain } = require('../../langchain-gemini/chain');
const { SlashCommandBuilder } = require('discord.js');
const { model, prompt } = require('../../langchain-gemini/llm');
const { CheerioWebBaseLoader } = require('@langchain/community/document_loaders/web/cheerio');
const { RecursiveCharacterTextSplitter } = require('langchain/text_splitter');
const { CohereEmbeddings } = require('@langchain/cohere');
const { MemoryVectorStore } = require('langchain/vectorstores/memory');
const { createStuffDocumentsChain } = require('langchain/chains/combine_documents');
const { createRetrievalChain } = require('langchain/chains/retrieval');

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 200,
    chunkOverlap: 20,
});

const embeddings = new CohereEmbeddings({
    model: 'embed-english-v3.0'
});

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('rag')
        .setDescription('Upload your file')
        .addStringOption(option =>
            option.setName('url')
                .setDescription('Send the url link')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('input')
                .setDescription('Ask a question')
                .setRequired(true)),

    async execute(interaction) {
        const url = interaction.options.getString('url');
        const input = interaction.options.getString('input');

        //Delay fetching
        await interaction.deferReply({ ephemeral: false });

        // Load the content from the URL
        const loader = new CheerioWebBaseLoader(url);
        const docs = await loader.load();
        if (!docs || docs.length === 0) {
            return interaction.reply({ content: 'No content found at the provided URL.', ephemeral: true });
        }

        // Split documents into chunks
        const splitDocs = await splitter.splitDocuments(docs);

        // Create vector store with embeddings
        const vectorStore = await MemoryVectorStore.fromDocuments(splitDocs, embeddings);

        // Set up retriever
        const retriever = vectorStore.asRetriever({
            k: 2,
        });

        // Create chain for document retrieval and combination
        const chain = await createStuffDocumentsChain({
            llm: model,
            prompt,
        });

        const retrievalChain = await createRetrievalChain({
            combineDocsChain: chain,
            retriever,
        });

        try {
            const response = await retrievalChain.invoke({
                input: input,
            });
            // console.log(response.answer)
            await interaction.followUp(response.answer);

        } catch (err) {
            console.error('Error executing retrieval chain:', err);
            await interaction.reply({ content: 'Something went wrong. Please try again later.', ephemeral: true });
        }
    },
};
