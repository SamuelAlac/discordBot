const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
    .setName('locale')
    .setDescription('translation testing'),

    async execute(interaction){
        const locales = {
		    pl: 'Witaj Świecie!',
		    de: 'Hallo Welt!',
            tl: 'Kamusta Mundo!'
        };
        interaction.reply(locales[interaction.locale] ?? 'Hello World! (default is english)');
        //If your discord language settings is set to the following,
        //Example German, the reply will be "Hallo Welt!"
    },
};