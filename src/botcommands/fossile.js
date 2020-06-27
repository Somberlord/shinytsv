const config = require("../config/botconfig");
const ranArray = [0, 1, 2, 3];

async function checkRole(msg) {
  let user = msg.author;
  msg.guild.members.delete(user.id);
  let member = await msg.guild.fetchMember(user);
  if(member.roles.get('670019767981309952')) {
    return true;
  } else {
    return false
  }
}

async function displayPokemon(msg, value) {
  let firstMon = Math.floor(value/4);
  let filteredArray = ranArray.filter((val) => {return val != firstMon});
  let ranNumber = Math.floor(Math.random() * 3);
  let secondMon = filteredArray[ranNumber];
  await msg.member.addRole(config.fossile_role);
  await msg.channel.send(msg.author + ' a déterré ' + config.fossile_name[firstMon] + ' et ' + config.fossile_name[secondMon]);
}

exports.run = async (bot, msg, args) => {
  let hasRole = await checkRole(msg);
  if(hasRole) {
    await msg.channel.send("Vous avez déjà joué " + msg.author).then(mesg => mesg.delete(8000));
    msg.delete(1000);
    return 0;
  }

  let messages = await msg.channel.fetchPinnedMessages();
  let pinnedMessage = null;
  messages.forEach(element => {
      if(element.content.startsWith("[Loterie fossiles]")) {
          pinnedMessage = element;
      }
  });
  if(pinnedMessage !== null) {
    let pinnedid = pinnedMessage.id;
    msg.channel.messages.delete(pinnedid);
    let fetchedMessage = await bot.guilds.get(msg.guild.id).channels.get(msg.channel.id).fetchMessage(pinnedid);
    let addedReactions = 0;
    let promises = [];
    fetchedMessage.reactions.tap(async (reaction) => {
      let prom = new Promise( async (resolve, reject) => {
        await reaction.fetchUsers()
        if(reaction.users.get(msg.author.id)) {
          let num = config.fossiles[reaction.emoji.id];
          addedReactions += num;
        };
        resolve();
      });
      promises.push(prom);
    });
    Promise.all(promises).then(() => displayPokemon(msg, addedReactions));
  } else {
    msg.channel.send("Aucun message de loterie fossile trouvé").then(mesg => mesg.delete(8000));
  }
  msg.delete(1000);
  return 0;
}

exports.config = {
  names: ["fouille"],
  auth: 1,
  usage: `${config.prefix}fouille`
}