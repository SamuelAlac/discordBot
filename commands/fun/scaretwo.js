//To fetch the message instance,
//You can use:
//ChatInputCommandInteraction#fetchReply() or fetchReply()
//Do note that this incurs an extra API call in comparison to withResponse: true

//Lastly, you may also want to delete the initial reply.
//This can be achieved by using:
//ChatInputCommandInteraction#deleteReply() or deleteReply()
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
    .setName('scaretwo')
    .setDescription('some scary prompt 2'),

    async execute(interaction){
        await interaction.reply('IM WATCHING U AGAIN');
        const message = await interaction.fetchReply();
        console.log(message);
        await interaction.deleteReply();
  },
};
//console.log(message) output
/*
interaction: {
    id: '1396342749875146843',
    type: 2,
    commandName: 'scaretwo',
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