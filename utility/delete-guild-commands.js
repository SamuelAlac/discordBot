require('dotenv').config({ path: '../.env' });
const { REST, Routes } = require('discord.js');

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

//Deleting all guild commands
rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: [] })
    .then(() => console.log(`Successfully deleted all guild commands.`))
    .catch(console.error);