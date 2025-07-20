const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
    .setName('upload')
    .setDescription('Attach a file')
    .addAttachmentOption(option =>
        option.setName('file')
        .setDescription('attach a file to proceed')
        .setRequired(true)),
    
    async execute(interaction) {
        const file = interaction.options.getAttachment('file');

        if (!file) {
            return interaction.reply({ content: 'No file attached!', ephemeral: true });
        }

        await interaction.reply({
            content: `File Received ${file.name}`,
        files: [file.url]
        });
    },
};