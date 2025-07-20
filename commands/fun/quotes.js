//The reply() and deferReply() methods are both initial responses
//but cannot be used to send additional messages.
//This is where follow-up messages come in. After having initially responded to an interaction.
//This can be achieved by using:
//ChatInputCommandInteraction#followUp() or followUp()
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
    .setName('qotd')
    .setDescription('Sends a random quote :>'),

    async execute (interaction){
        const response = await fetch('https://dummyjson.com/quotes');
        const quoteData = await response.json();
        const quotesCount = quoteData?.quotes.length;
        const randomNumber = Math.floor(Math.random()* quotesCount) + 1;

        const randomQuoteResponse = await fetch(`https://dummyjson.com/quotes/${randomNumber}`);
        const randomQuote = await randomQuoteResponse.json();

        if(randomQuote && randomQuote.quote){
            await interaction.reply('Hello There')
            await interaction.followUp(`Here's a random quote: "${randomQuote.quote}"`)
        }
    },
};
