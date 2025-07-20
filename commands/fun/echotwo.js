const { SlashCommandBuilder, ChannelType } = require('discord.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
    .setName('echotwo')
    .setDescription('Replies with your input')
    .addStringOption(option =>
        option.setName('input')
        .setDescription('The input to echo into')
        .setMaxLength(255))
    .addChannelOption(option =>
        option.setName('channel')
        .setDescription('The channel to echo into')
        .addChannelTypes(ChannelType.GuildText)),

    async execute(interaction){
        const input = interaction.options.getString('input')
        const channel = interaction.options.getChannel('channel')

        await channel.send(input)
        await interaction.reply('Message echoed!')
    }
}