//You may require the Message object of a reply for various reasons, such as adding reactions
// Pass withResponse: true to obtain the InteractionCallbackResponse
//You can then access the Message object like so: 
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
    .setName('scare')
    .setDescription('some scary prompt'),

    async execute(interaction){
        const response = await interaction.reply({
            content: 'IM WATCHING U',
            withResponse: true,
        });
        console.log(response.resource.message);
    },
};

//console.log(response.resource.message) output
/*
interaction: {
    id: '1396342413374525480',
    type: 2,
    commandName: 'scare',
    user: User {
      id: '801516352191856660',
      bot: false,
      system: false,
      flags: [UserFlagsBitField],
      username: 'samuelonearth',
      globalName: 'Ryu',
      discriminator: '0',
      avatar: '1e8738ce632859332934581a0e974465',
      banner: null,
      accentColor: null,
      avatarDecoration: null,
      avatarDecorationData: null
    }
  },
  poll: null,
  messageSnapshots: Collection(0) [Map] {},
  call: null
}
*/