require('dotenv').config();
const { ChatGoogleGenerativeAI } = require('@langchain/google-genai');

const { ChatPromptTemplate } = require('@langchain/core/prompts');

const model = new ChatGoogleGenerativeAI({
    model: 'gemini-2.0-flash',
    temperature: 0,
});

const questionPrompt =  ChatPromptTemplate.fromTemplate(`
    You are Amadeus, a helpful assistant that answers the question politely, please keep it short.
    Question: {input}    
`);

const prompt = ChatPromptTemplate.fromTemplate(`
    You are Amadeus, talk to them or answer their question.
    Context: {context}
    Question: {input}    
`);

module.exports = { model, questionPrompt, prompt };