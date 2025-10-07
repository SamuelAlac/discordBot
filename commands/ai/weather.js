const { SlashCommandBuilder } = require('discord.js');
const fetchWeatherData = require('../../api/weatherAPI');
const { weatherPrompt, model } = require('../../langchain-gemini/llm');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    cooldown: 10,
    data: new SlashCommandBuilder()
    .setName('weather')
    .setDescription('Check weather status'),

    async execute(interaction){
        try{
            
            await interaction.deferReply({ epheral: false });
            const weather = await fetchWeatherData();
            const chain = weatherPrompt.pipe(model);
            const response = await chain.invoke({
                country: weather?.location?.country,
                word: weather?.current?.condition?.text,
            });

            await interaction.followUp({
                content: `Country: ${weather?.location?.country}
                \nCurrent Weather Condition: ${weather?.current?.condition?.text}
                \nAdvice: ${response.content}`,
                // files: [{ attachment: `https:${weather?.current?.condition?.icon}`}]

            });

        }catch(err){
            console.log(err)
        }

    }
}