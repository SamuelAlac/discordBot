//The AutocompleteInteraction class provides the AutocompleteInteraction#respond() method to send a response.
//Using this, you can submit an array of ApplicationCommandOptionChoiceData
//Passing an empty array will show "No options match your search" for the user.

//The CommandInteractionOptionResolver#getFocused()
//returns the currently focused option's value, which can be used to apply filtering to the choices presented.
//For example, to only display options starting with the focused value you can use the Array#filter()
//then using Array#map(), you can transform the array into an array of ApplicationCommandOptionChoiceData objects.
const { SlashCommandBuilder } = require('discord.js');
const { questionPrompt, model } = require('../../langchain gemini/llm');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
    .setName('guide')
    .setDescription('Discord Guide')
    .addStringOption(option =>
        option.setName('query')
        .setDescription('Phrases to search for')
        .setRequired(true)
        .setAutocomplete(true)),
    
    async autocomplete(interaction){
        const focusedValue = interaction.options.getFocused();
        const choices = [
            'How can I get good at something',
            'How can I stay motivated',
            'How can I stop overthinking',
            'How can I have fun in life',
            'How can I easily sleep at night'
        ];

        const filteredChoices = choices.filter(choices => choices.startsWith(focusedValue.toLowerCase()));
        await interaction.respond(
            filteredChoices.map(choice => ({ name: choice, value: choice })),
        );
    },

    async execute(interaction){
        const choice = interaction.options.getString('query');

        const validChoices = [
        'How can I get good at something',
        'How can I stay motivated',
        'How can I stop overthinking',
        'How can I have fun in life',
        'How can I easily sleep at night'
        ];

        if(!validChoices.includes(choice)){
            await interaction.reply({
                content: 'Invalid choice. Please select from the autocomplete suggestions.',
                ephemeral: true,
            });
        }

        await interaction.deferReply({ epheral: false });

        const chain = questionPrompt.pipe(model);
        const response = await chain.invoke({
            input: choice,
        })

        await interaction.followUp(response.content);
    }
}