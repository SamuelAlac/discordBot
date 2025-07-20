const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('reload')
    .setDescription('Reload a command.')
    .addStringOption(option =>
        option.setName('command')
        .setDescription('The command to reload')
        .setRequired(true)),

    async execute(interaction){
        const commandName = interaction.options.getString('command', true).toLowerCase();
        const command = interaction.client.commands.get(commandName);

        if(!command){
            return interaction.reply(`There is no command with the name \`${commandName}\`!`);
        }

        const filePath = command.filePath;

        delete require.cache[require.resolve(filePath)];
        
        try{
            const newCommand = require(filePath);
            interaction.client.commands.set(newCommand.data.name, newCommand);
            await interaction.reply(`Command \`${newCommand.data.name}\` was reloaded!`);
        }catch(err){
            console.log(err);
            await interaction.reply(`There was an error while reloading a command \`${command.data.name}\`:\n\`${err.message}\``);
        }
    },
};