const { SlashCommandBuilder } = require('discord.js');
const { model, questionPrompt } = require('../../langchain gemini/llm');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
    .setName('ask')
    .setDescription('Question')
    .addStringOption(option =>
        option.setName('input')
        .setDescription('Input text')
        .setRequired(true)),

    async execute(interaction){

        const userInput = interaction.options.getString('input')

        const chain = questionPrompt.pipe(model);
        const response = await chain.invoke({
            input: userInput,
        });

        await interaction.reply(response);
        // await interaction.deferReply({ ephemeral: false });
        // await interaction.followUp(response.content);
    }
};