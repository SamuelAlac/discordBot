require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
// Grab all the command folders from the commands directory you created earlier
const foldersPath = path.join(__dirname, '..' ,'commands');
const commandFolders = fs.readdirSync(foldersPath);

//Runs all the command files from the command directory
for (const folder of commandFolders) {
	// Grab all the command files from the commands directory you created earlier
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

//deploy your commands
(async() =>{
    try{
        console.log(`Started refreshing ${commands.length} application (/) commands.`)
        // The put method is used to fully refresh all commands in the guild with the current set
        // Routes.applicationCommands(process.env.CLIENT_ID) 
        // = These commands are available in every guild (server) your bot is in.
        // Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID) 
        // = These commands are only available in the specified guild (server). 
        const data = await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            {
                body: commands,
            },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`)
    }catch(err){
        console.log(err)
    }
})();