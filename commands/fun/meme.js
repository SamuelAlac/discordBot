//After you've sent an initial response, you may want to edit that response for various reasons.
//This can be achieved using:
//ChatInputCommandInteraction#editReply() or editReply()
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
    .setName('meme')
    .setDescription('Generate a very funny joke haha lol'),

    async execute(interaction){
        const wait = require('node:timers/promises').setTimeout;

        await interaction.reply('You are the meme :>');
        await wait(3000);
        await interaction.editReply('Just kidding!')
    }
};