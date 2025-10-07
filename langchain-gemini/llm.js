require('dotenv').config();
const { ChatGoogleGenerativeAI } = require('@langchain/google-genai');

const { ChatPromptTemplate } = require('@langchain/core/prompts');

const model = new ChatGoogleGenerativeAI({
    model: 'gemini-2.0-flash',
    temperature: 0,
});

const questionPrompt =  ChatPromptTemplate.fromTemplate(`
    You are Amadeus, a helpful assistant that answers question, your answer should not exceed 5 sentences.
    Question: {input}
`);

const orderPrompt = ChatPromptTemplate.fromMessages([
    ['system', 'Extract all orders from the user input as JSON, formatting instruction: {format_instructions}'],
    ['user', '{order}']
]);

const weatherPrompt = ChatPromptTemplate.fromMessages([
    ['system', `Based on the given input in the weather condition in the {country}, give your best advice to help them
     keep it up to 2 - 3 sentences`],
    ['user', '{word}'],
]);

const prompt = ChatPromptTemplate.fromTemplate(`
    You are Amadeus, a helpful assistant that answers the question. your answer should not exceed 5 sentences.
    Context: {context}
    Question: {input}    
`);

module.exports = { model, questionPrompt, orderPrompt, weatherPrompt ,prompt };