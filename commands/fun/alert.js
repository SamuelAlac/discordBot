//what if you have a command that performs a task which takes longer than three seconds before being able to reply?
//You can make use of:
//ChatInputCommandInteraction#deferReply() or deferReply()
//Which triggers the <application> is thinking... message.
const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
    .setName('alert')
    .setDescription('Alerts!'),

    async execute(interaction){
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });
        await wait(3000);
        await interaction.editReply('Di ka na nya mahal :<');
    }
};