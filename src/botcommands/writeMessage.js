const config = require("../config/botconfig");
const bdd = require('../utils/bdd');


function saveMessageInDbAsync(msg) {
  bdd.query('INSERT INTO botreactionmessage (message_id,channel_id,guild_id) VALUES ($1, $2, $3)', [msg.id, msg.channel.id, msg.guild.id], (error, results) => {
    if (error) {
      console.log(error);
    }
  })  
}

async function addReactions(msg) {
  await msg.react(msg.guild.emojis.get(config.reactions.tsv_egg));
  msg.react(msg.guild.emojis.get(config.reactions.tsv_nexttime));
}

exports.run = async (bot, msg, args) => {
  channelid = args[0].replace(/\D/g,'');
  channel = msg.guild.channels.get(channelid);
  if(channel === undefined || msg.member === undefined) {
    return 1;
  }
  if(!msg.member.hasPermission("MANAGE_GUILD", false, true, true)) {
    msg.channel.send("Vous n'avez pas les permissions pour utiliser cette commande");
    return 2;
  }
  
  messageContent = args.slice(1).join(' ');
  channel.send(messageContent)
    .then(message => {
      saveMessageInDbAsync(message);
      bot.guilds.get(message.guild.id).channels.get(message.channel.id).fetchMessage(message.id)
        .then(fetchedmsg => {
          addReactions(fetchedmsg);
        })
    })
    .catch(console.error);
  return 0;
}

exports.config = {
  names: ["write-message", "wm"],
  auth: 1,
  usage: `${config.prefix}wm <channel> <message>`
}