require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, Collection } = require('discord.js');

//Creating a client instance
const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.commands = new Collection();
client.cooldowns = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders){
    // Grab all the command files from the commands directory you created earlier
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('js'));
    // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
    for(const file of commandFiles){
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        //Set a new item in the collection with the key as the command name and the value as the exported module
        if('data' in command && 'execute' in command){
            command.filePath = filePath;
            client.commands.set(command.data.name, command);
        }else{
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
};

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('js'));

for (const file of eventFiles){
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);

    if(event.once){
        client.once(event.name, (...args) => event.execute(...args));
    }else{
        client.on(event.name, (...args) => event.execute(...args));
    }
}

//Log in Discord with your client's token
client.login(process.env.DISCORD_TOKEN);


