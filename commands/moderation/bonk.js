//You can use SlashCommandBuilder#setDefaultMemberPermissions()
//to set the default permissions required for a member to run the command
//For a ban command, a sensible default is to ensure that users already have the Discord permission BanMembers
//const user = interaction.options.getUser('target');
//guild.members.ban(user);
//or const user = interaction.options.getMember('target');
//It doesn't make much sense for your ban command to be available in DMs,
//so you can add setContexts(InteractionContextType.Guild) to the builder so that it is only available in guilds:
const { SlashCommandBuilder, PermissionFlagsBits, InteractionContextType } = require('discord.js')

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
    .setName('bonk')
    .setDescription('Select a member to bonk')
    .addUserOption(option =>
        option.setName('target')
        .setDescription('bonk this member')
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .setContexts(InteractionContextType.Guild),

    async execute(interaction){
        const target = interaction.options.getUser('target');
        const member = await interaction.guild.members.fetch(target.id);

        if(!member.bannable){
            await interaction.reply({ content: 'I cannot ban this user, they might have higher permissions than me.', ephemeral: true });
        }
        try{
            await member.ban({ reason: 'bonk' });
            await interaction.reply({ content: `${target.tag} has been banned successfully`, ephemeral: false });
        }catch(err){
            console.log(err)
            await interaction.reply({ content: 'An error occurred while trying to ban this user.', ephemeral: true });
        }
    },
};