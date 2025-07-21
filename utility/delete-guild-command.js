require('dotenv').config({ path: '../.env' });
const { REST, Routes } = require('discord.js');

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

//Replace the 'commandID' with the actual command ID
//Delete command
rest.delete(Routes.applicationGuildCommand(process.env.CLIENT_ID, process.env.GUILD_ID, 'commandID'))
    .then(() => console.log(`Successfully deleted guild command.`))
    .catch(console.error);