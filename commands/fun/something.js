const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
    .setName('something')
    .setDescription('Replies with Pong!'),

    async execute (interaction){
        await interaction.reply('Pong!');
    },
};



