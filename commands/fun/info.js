//Subcommands are available with the .addSubcommand() method.
//This allows you to branch a single command to require different options depending on the subcommand chosen.
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Provides user or server info')
    .addSubcommand(subcommand =>
        subcommand.setName('user')
        .setDescription('Info about a user')
        .addUserOption(option =>
            option.setName('target')
            .setDescription('The user')))
    .addSubcommand(subcommand =>
        subcommand.setName('server')
        .setDescription('info about the server')),

    async execute(interaction){
        if(interaction.options.getSubcommand() === 'user'){
            const user = interaction.options.getUser('target');

            if(user){
                await interaction.reply(`Username: ${interaction.user.username}\nYour ID: ${interaction.user.id}`);
            }else{
                await interaction.reply(`User does not exist`);
            }
        }else if(interaction.options.getSubcommand() === 'server'){
            await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
        }
    },
};