const { Events, ActivityType, PresenceUpdateStatus  } = require('discord.js');

//When the client is ready, run this code (only once)
module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client){
        console.log(`Logged in as ${client.user.tag}`);
        // Set the bot's activity and status
        client.user.setPresence({
            activities: [{
                name: 'Your Playlist',
                type: ActivityType.Listening,
            }],
            status: PresenceUpdateStatus.DoNotDisturb,
        });
    },
};