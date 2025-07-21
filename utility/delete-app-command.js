require('dotenv').config({ path: '../.env' });
const { REST, Routes } = require('discord.js');

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

//Replace the 'commandID' with the actual command ID
//Delete command
rest.delete(Routes.applicationCommand(process.env.CLIENT_ID, 'commandID'))
    .then(() => console.log(`Successfully deleted application command.`))
    .catch(console.error);