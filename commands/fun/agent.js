/*To distinguish between multiple options, you can pass true into CommandInteractionOptionResolver#getFocused()
which will now return the full focused object instead of just the value.
This is used to get the name of the focused option below,
allowing for multiple options to each have their own set of suggestions

The following methods work the same in AutocompleteInteraction
const string = interaction.options.getString('input');
const integer = interaction.options.getInteger('int');
 const boolean = interaction.options.getBoolean('choice');
 const number = interaction.options.getNumber('num');

 methods that are not available to autocomplete interactions.
.getUser(),
.getMember(),
.getRole(), 
.getChannel(), 
.getMentionable()
.getAttachment() 
*/ 
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
    .setName('agent')
    .setDescription('Create a fake agent lol im bored')
    .addStringOption(option =>
        option.setName('name')
        .setDescription('Set agent name')
        .setRequired(true))
    .addStringOption(option =>
        option.setName('role')
        .setDescription('Set the agent role')
        .setRequired(true)
        .setAutocomplete(true))
    .addStringOption(option =>
        option.setName('version')
        .setDescription('Set agent version')
        .setRequired(true)
        .setAutocomplete(true)),
    
    async autocomplete(interaction){
        const focusedOption = interaction.options.getFocused(true);
        let choices;

        if(focusedOption.name === 'role'){
            choices = ['Fighter', 'Guard', 'Gunner', 'Assassin', 'Mage'];
        }

        if(focusedOption.name === 'version'){
            choices = ['v1.0', 'v1.5', 'v2.0', 'v2.5', 'v3.0'];
        }

        const filteredChoice = choices.filter(choice => choice.startsWith(focusedOption.value));
        await interaction.respond(
            filteredChoice.map(choice => ({ name: choice, value: choice })),
        );
    },

    async execute(interaction){
        const name = interaction.options.getString('name')
        const role = interaction.options.getString('role');
        const version = interaction.options.getString('version');

        const validRoles = ['Fighter', 'Guard', 'Gunner', 'Assassin', 'Mage'];
        if(!validRoles.includes(role)){
            await interaction.reply({
                content: 'Invalid role. Please select from the autocomplete suggestions.',
                ephemeral: true,
            });
        }

        const validVersions = ['v1.0', 'v1.5', 'v2.0', 'v2.5', 'v3.0'];
        if(!validVersions.includes(version)){
            await interaction.reply({
                content: 'Invalid version. Please select from the autocomplete suggestions.',
                ephemeral: true,
            }); 
        }

        await interaction.reply({
            content: `Agent created: \nName: ${name}\nRole: ${role}\nVersion: ${version}`
        })
    }
};