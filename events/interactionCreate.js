const { Events, MessageFlags, Collection } = require('discord.js');

//For handling interactions
module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction){
    if(!interaction.isChatInputCommand()){
        return;
    }
    
    const command = interaction.client.commands.get(interaction.commandName);

    if(!command){
        console.log(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    const { cooldowns } = interaction.client;
    if(!cooldowns.has(command.data.name)){
        cooldowns.set(command.data.name, new Collection());
    }

    const now = Date.now(); // The current timestamp
    //Create reference to the Collection of user ids and timestamp key/value pairs for the triggered command.
    const timestamps = cooldowns.get(command.data.name);
    // Specified default cooldown for the command, converted to milliseconds for straightforward calculation.
    const defaultCooldownDuration = 3;
    const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;

    if(timestamps.has(interaction.user.id)){
        const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
        if(now < expirationTime){
            const expiredTimestamp = Math.round(expirationTime / 1000);
            return interaction.reply({
                content: `Please wait, you are on a cooldown for \`${command.data.name}\`. You can use it again <t:${expiredTimestamp}:R>.`,
                flags: MessageFlags.Ephemeral
            });
        }
    }

    timestamps.set(interaction.user.id, now);
    setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

        try{
            await command.execute(interaction)
        }catch(err){
            if(interaction.replied || interaction.deferred){
                await interaction.followUp({
                    content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral
                    });
            }else{
                await interaction.reply({
                    content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral
                });
            }
        }
    }
}