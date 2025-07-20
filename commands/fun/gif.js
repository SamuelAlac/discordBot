//The String, Number, and Integer option types can have choices
//This is particularly useful when dealing with external datasets, APIs, and similar,
//where specific input formats are required.
//Specify choices by using:
//addChoices()
//such as into SlashCommandBuilder#addStringOption() or addStringOption()
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
    .setName('gif')
    .setDescription('sends some fake gifs lol')
    .addStringOption(option =>
    option.setName('category')
    .setDescription('gif category')
    .setRequired(true)
    .addChoices(
        {
            name: 'Funny', value: 'funny.gif'
        },
        {
            name: 'Sad', value: 'sad.gif'
        },
        {
            name: 'Cat', value: 'cat.gif'
        },
    )),

    async execute(interaction){
        const category = interaction.options.getString('category')
        const gifUrls = {
            'funny.gif': 'https://placekitten.com/400/300?text=Funny',
            'sad.gif': 'https://placekitten.com/400/300?text=Sad',
            'cat.gif': 'https://tenor.com/U7lSA5aTtm.gif',
        };
        const gif = gifUrls[category]

        await interaction.reply({
            content: `Here is your ${category.split('.')[0]} gif!`,
            files: [gif],
        });
    },
};