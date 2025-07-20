//You can use SlashCommandBuilder#setDefaultMemberPermissions()
//to set the default permissions required for a member to run the command
//For a kick command however, we can allow members with the KickMembers permission
//const user = interaction.options.getUser('target');
//guild.members.kick(user);
//or const user = interaction.options.getMember('target');
//It doesn't make much sense for your ban command to be available in DMs,
//so you can add setContexts(InteractionContextType.Guild) to the builder so that it is only available in guilds:
const { SlashCommandBuilder, PermissionFlagsBits, InteractionContextType } = require('discord.js')

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Select a member to kick')
    .addUserOption(option =>
        option.setName('target')
        .setDescription('kick this member')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .setContexts(InteractionContextType.Guild),

    async execute(interaction){
        const target = interaction.options.getUser('target');
        const member = await interaction.guild.members.fetch(target.id);

        if(!member.kickable){
            await interaction.reply({ content: 'I cannot kick this user, they might have higher permissions than me.', ephemeral: true });
        }
        try{
            await member.kick({ reason: "You're annoying" });
            await interaction.reply({ content: `${target.tag} has been kicked successfully`, ephemeral: false });
        }catch(err){
            console.log(err)
            await interaction.reply({ content: 'An error occurred while trying to kick this user.', ephemeral: true });
        }
    },
};