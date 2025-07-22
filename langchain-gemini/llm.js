require('dotenv').config();
const { ChatGoogleGenerativeAI } = require('@langchain/google-genai');

const { ChatPromptTemplate } = require('@langchain/core/prompts');

const model = new ChatGoogleGenerativeAI({
    model: 'gemini-2.0-flash',
    temperature: 0,
});

const questionPrompt =  ChatPromptTemplate.fromTemplate(`
    You are Amadeus, a helpful assistant that answers question.
    Question: {input}    
`);

const orderPrompt = ChatPromptTemplate.fromMessages([
    ['system', 'Extract all orders from the user input as JSON, formatting instruction: {format_instructions}'],
    ['user', '{order}']
])

const prompt = ChatPromptTemplate.fromTemplate(`
    You are Amadeus, a helpful assistant that answers the question.
    Context: {context}
    Question: {input}    
`);

module.exports = { model, questionPrompt, orderPrompt ,prompt };