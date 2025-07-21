const { SlashCommandBuilder } = require('discord.js');
const fetchCatData = require('../../api/catAPI');

module.exports = {
    cooldown: 3,
    data: new SlashCommandBuilder()
    .setName('cat')
    .setDescription('Sends a random cat image'),

    async execute(interaction){

        await interaction.deferReply({ ephemeral: false });

        const catURL = await fetchCatData();

        await interaction.followUp({
            content: "Here's a cat image to brighten your day 💕🐾",
            files: [{ attachment: catURL }],
        });
    },
};