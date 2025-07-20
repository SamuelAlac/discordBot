//Even without predetermined choices, additional restrictions can still be applied on otherwise free input
//For String options, setMaxLength() and setMinLength() can enforce length limitations
//For Integer and Number options, setMaxValue() and setMinValue() can enforce range limitations on the value
//For Channel options, addChannelTypes() can restrict selection to specific channel types, e.g. ChannelType.GuildText
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