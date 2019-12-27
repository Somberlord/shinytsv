const config = require("../config/botconfig");
const bdd = require('../utils/bdd');


function saveMessageInDbAsync(msg) {
  bdd.query('INSERT INTO botreactionmessage (message_id,channel_id,guild_id) VALUES ($1, $2, $3)', [msg.id, msg.channel.id, msg.guild.id], (error, results) => {
    if (error) {
      throw error
    }
  })  
}

exports.run = async (bot, msg, args) => {
  channelid = args[0].replace(/\D/g,'');
  channel = msg.guild.channels.get(channelid);
  if(channel === undefined) {
    return 1;
  }
  messageContent = args.slice(1).join(' ');
  channel.send(messageContent)
    .then(message => {
      console.log(message.id);
      saveMessageInDbAsync(message);
      bot.guilds.get(message.guild.id).channels.get(message.channel.id).fetchMessage(message.id)
        .then(fetchedmsg => console.log(fetchedmsg.content))
    })
    .catch(console.error);
  return 0;
}

exports.config = {
  names: ["write-message", "wm"],
  auth: 1,
  usage: `${config.prefix}wm <message>`
}