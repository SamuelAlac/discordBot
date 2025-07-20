require('dotenv').config();
const { ChatGoogleGenerativeAI } = require('@langchain/google-genai');

const { ChatPromptTemplate } = require('@langchain/core/prompts');

const model = new ChatGoogleGenerativeAI({
    model: 'gemini-2.0-flash',
    temperature: 0,
});

const prompt = ChatPromptTemplate.fromTemplate(`
    You are Amadeus, talk to them or answer their question, please keep it short.
    Context: {context}
    Question: {input}    
`);

module.exports = { model, prompt };