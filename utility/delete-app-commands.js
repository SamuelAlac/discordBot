require('dotenv').config({ path: '../.env' });
const { REST, Routes } = require('discord.js');

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

//Deleting all application commands
rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: [] })
    .then(() => console.log(`Successfully deleted all aplication commands.`))
    .catch(console.error);