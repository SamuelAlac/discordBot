const { SlashCommandBuilder, MessageFlags } = require('discord.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Send the list of commands'),
    
    async execute(interaction){

        const commandsList = [
        '/help - Send the list of commands',
        '/alert - Trigger an alert',
        '/echo - Repeat your message',
        '/echotwo - Another echo command',
        '/fileupload - Upload a file',
        '/gif - Send a random GIF',
        '/greet - Send a greeting message',
        '/info - Display bot information',
        "/locale - Set or get a user's locale",
        '/meme - Send a random meme',
        '/ping - Check bot latency',
        '/qotd - Send a random quote',
        '/scare - Scare a user',
        '/scaretwo - Another scare command',
        '/server - Display server information',
        '/something - Execute a custom action',
        '/user - Get user information',
        '/bonk - Bonk a user',
        '/dm - Send a direct message to a user',
        '/kick - Kick a user from the server',
        '/reload - Reload all commands',
        '/rag - Answers your query about website url you provided',
        '/ask - Answers your questions'
        ];

        await interaction.reply(`Here are the list of the available commands: \n\n${commandsList.join('\n')}`);
    }
}