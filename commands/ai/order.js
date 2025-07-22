const { SlashCommandBuilder } = require('discord.js');
const { StructuredOutputParser } = require('@langchain/core/output_parsers');
const { model, orderPrompt } = require('../../langchain-gemini/llm')
const { z } = require('zod')

const structuredOutputParser = StructuredOutputParser.fromZodSchema(
    z.object({
        orders: z.array(
            z.object({
                food: z.string().describe('the name of the food'),
                quantity: z.number().describe('the amount of food to order'),
            }),
        ),
    }),
);

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
    .setName('order')
    .setDescription('Order a food via prompt')
    .addStringOption(option =>
        option.setName('input')
        .setDescription('Input your order, could be in sentence form')
        .setRequired(true)),

    async execute(interaction){
        const input = interaction.options.getString('input');
        const chain = orderPrompt.pipe(model).pipe(structuredOutputParser);

        await interaction.deferReply({ ephemeral: false });

        const response = await chain.invoke({
            order: input,
            format_instructions: structuredOutputParser.getFormatInstructions(),
        });

        await interaction.followUp({ content: JSON.stringify(response, null, 2) });
    },
};