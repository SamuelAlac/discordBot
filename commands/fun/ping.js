const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),

    async execute (interaction){
        await interaction.reply(`Bot Response Time : ${Date.now() - interaction.createdTimestamp}.\nAPI Latency : ${Math.round(interaction.client.ws.ping)}ms.`);
        await interaction.user.send('nice wifi lol'); // dms the user lol
    },
};



