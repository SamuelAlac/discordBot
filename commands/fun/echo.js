//Application commands can have additional options.
//Think of these options as arguments to a function,
//and as a way for the user to provide the additional information the command requires.

//The simplest form of standard text input with no additional validation is:
//.addStringOption
//Get the data via const input = interaction.options.getString('input')
//await interaction.reply({content: input})

//You could also change the behavior of this command in many ways,
//such as using a Channel option to direct the response to a specific channel:
//.addChannelOption
//Get the data via const channel = interaction.options.getChannel('channel')
//await channel.send(input)

//Or a Boolean option to give the user control over making the response ephemeral.
//.addBooleanOption
//Get the data via const isEpheral = interaction.options.getBoolean('epheral');
//await interaction.reply({content: 'Message echoed!', ephemeral: isEphemeral});

//There is also an integer-based option that accepts whole numbers
//.addIntegerOption
//Get the data via const age = interaction.options.getInteger('age')
//await interaction.reply(`You entered age: ${age}`);

//There is a number-based option that accepts either floating point number or an integer.
//.addNumberOption
//Get the data via const price = interaction.options.getNumber('price')
//await interaction.reply(`The price of the product is $${price.toFixed(2)}`);

//And an an option that can accept a mentionable entity (e.g., a user, a role, or a channel).
//.addMentionableOption
//Get the data via const target = interaction.options.getMentionable('target')
//await interaction.reply(`Hello, ${target}!`);

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
    .setName('echo')
    .setDescription('Replies with your input')
    .addStringOption(option =>
        option.setName('input')
        .setDescription('The input to echo back')
        .setRequired(true))
    .addChannelOption(option =>
        option.setName('channel')
        .setDescription('The channel to echo into')
        .setRequired(true))
    .addBooleanOption(option =>
        option.setName('ephemeral')
        .setDescription('Whether or not the echo should be ephemeral')
        .setRequired(false)),

    async execute(interaction){
        const input = interaction.options.getString('input');
        const channel = interaction.options.getChannel('channel');
        const isEphemeral = interaction.options.getBoolean('ephemeral');

        await channel.send(input)
        await interaction.reply({content: 'Message echoed!', ephemeral: isEphemeral});
    },
};