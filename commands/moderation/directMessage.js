const { SlashCommandBuilder, MessageFlags } = require("discord.js");

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
    .setName('dm')
    .setDescription('Dms the user')
    .addUserOption(option =>
        option.setName('target')
        .setDescription('target user')
        .setRequired(true)),

    async execute(interaction){
        const target = await interaction.options.getUser('target');
        if(target){
            await interaction.deferReply({flag: MessageFlags.Ephemeral})
        }
        await target.send('Hai lods');
        await interaction.followUp("Message sent")
    }
}