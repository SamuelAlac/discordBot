//You may not always want everyone who has access to the channel to see a slash command's response.
//Previously, you would have had to DM the user to achieve this, potentially encountering
//the high rate limits associated with DM messages, or simply being unable to do so, if the user's DMs were disabled.

//Thankfully, Discord provides a way to hide response messages from everyone but the executor of the slash command.
//This is called an ephemeral message and can be set by providing flags:
//MessageFlags.Ephemeral in the InteractionReplyOptions
const { SlashCommandBuilder, MessageFlags } = require('discord.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
    .setName('greet')
    .setDescription('Greet the user'),
    
    async execute(interaction){
        await interaction.reply({
            content: `Hello ${interaction.user.username}, noob`,
            flags: MessageFlags.Ephemeral
        });
    },
};