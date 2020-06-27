const config = require("../config/botconfig");
const bdd = require('../utils/bdd');

async function getLastMessageFromDb(guild_id) {
    return new Promise( (resolve, reject) => {
        bdd.query('SELECT message_id, channel_id, guild_id, id FROM botreactionmessage WHERE guild_id = $1 ORDER BY id DESC LIMIT 1 ', [guild_id], (error, results) => {
            if (error) {
                reject(error);
              } else {
                resolve(results.rows[0]);
              }
        });
    });
}

async function doSave(query, data) {
    return new Promise( (resolve, reject) => {
        bdd.query(query, data, (error, results) => {
            if (error) {
                reject(error);
              } else {
                resolve(results.rows[0]);
              }
        });
    });
}


async function saveUsersToDb(user_ids, type, msg, msg_id, guild_id) {
    let values = "";
    let data = [];
    let doupdate = "";
    if(type === 'tsv_egg') {
        doupdate = "DO UPDATE SET participation='PARTICIPANT'";
        let cpt = 0;
        user_ids.forEach( userid => {
            if(values != "") {
                values = values + ",";
            }
            values = values + "($" + (cpt+1) + ",$" + (cpt+2) + ",$" + (cpt+3) + ",'PARTICIPANT')";
            data = data.concat([msg_id, userid, guild_id]);
            cpt = cpt+3;
        });
    } else if(type === 'tsv_nexttime') {
        doupdate = "DO NOTHING";
        let cpt = 0;
        user_ids.forEach( userid => {
            if(values != "") {
                values = values + ",";
            }
            values = values + "($" + (cpt+1) + ",$" + (cpt+2) + ",$" + (cpt+3) + ",'RETRY')";
            data = data.concat([msg_id, userid, guild_id]);
            cpt = cpt+3;
        });
    } else {
        console.log('UNRECOGNIZED TYPE');
        return false;
    }
    try {
        query = "INSERT INTO botparticipants(message_id, user_id, guild_id, participation) values" + values + " ON CONFLICT(message_id, user_id, guild_id) "+ doupdate;
        await doSave(query, data);
    } catch(error) {
        msg.channel.send("erreur lors de l'enregistrement des participants " + error);
        return false;
    }
}

function displayWinner(bot, channel, user_ids, message) {
    userlist = user_ids.map(user_id => bot.users.get(user_id)).join(" ");
    channel.send(message + "\n" + userlist);
}

async function getAllpotentialFromDb(msg, msg_id) {
    return new Promise( (resolve, reject) => {
        bdd.query("SELECT user_id FROM botparticipants WHERE user_id IN (SELECT user_id FROM botparticipants b2 WHERE b2.message_id=$1 AND b2.participation='PARTICIPANT') AND (participation='PARTICIPANT' OR participation='RETRY')", 
                        [msg_id], (error, results) => {
                if(error) {
                    msg.channel.send("erreur lors de l'enregistrement du participant " + userid + " " + error);
                } else {
                    resolve(results.rows.map(user => user.user_id));
                }
            });
    });
}

async function saveWinner(winnerid, message_id) {
    return new Promise( (resolve, reject) => {
        bdd.query("UPDATE botparticipants SET participation='WINNER' WHERE user_id = $1 AND message_id = $2", 
                        [winnerid, message_id], (error, results) => {
                if(error) {
                    msg.channel.send("erreur lors de l'enregistrement du participant " + userid + " " + error);
                } else {
                    resolve(results.rows.map(user => user.user_id));
                }
            });
    });
}

async function updateWinner(winnerid) {
    return new Promise( (resolve, reject) => {
        bdd.query("UPDATE botparticipants SET participation='DONE' WHERE user_id = $1 AND participation <> 'WINNER'", 
                        [winnerid], (error, results) => {
                if(error) {
                    msg.channel.send("erreur lors de l'enregistrement du participant " + userid + " " + error);
                } else {
                    resolve(results.rows.map(user => user.user_id));
                }
            });
    });
}

async function doDraw(msg, msg_id, nbwinner) {
    let allusers =  await getAllpotentialFromDb(msg, msg_id);
    let winnerlist = [];
    for(let i = 0 ; i < nbwinner ; i++) {
        let winnerid = allusers[Math.floor(Math.random() * allusers.length)];
        await saveWinner(winnerid, msg_id);
        await updateWinner(winnerid);
        winnerlist.push(winnerid);
        allusers = allusers.filter( userid => userid != winnerid);
        if(allusers.length === 0 ) {
            return winnerlist;
        }
    }
    return winnerlist;
    // maj la bdd avec le vainqueur
}

exports.run = async (bot, msg, args) => {
  channelid = args[0].replace(/\D/g,'');
  channel = msg.guild.channels.get(channelid);
  nbwinners = parseInt(args[1], 10);
  if(channel === undefined || msg.member === undefined || isNaN(nbwinners)) {
    return 1;
  }
  if(!msg.member.hasPermission("MANAGE_GUILD", false, true, true)) {
    msg.channel.send("Vous n'avez pas les permissions pour utiliser cette commande");
    return 2;
  }
  message = messageContent = args.slice(2).join(' ');
  let bddmsg = await getLastMessageFromDb(msg.guild.id)
    .catch(err => {throw err});
  if(bddmsg === undefined) {
      return 2;
  }
  bot.guilds.get(bddmsg.guild_id).channels.get(bddmsg.channel_id).fetchMessage(bddmsg.message_id)
        .then(fetchedmsg => {
            fetchedmsg.reactions.forEach(async (reaction) => {
                await reaction.fetchUsers();
                if(reaction._emoji.id === config.reactions.tsv_egg) {
                    tsv_egg_ids = reaction.users.filter(user => user != bot.user).map(user =>user.id);
                    // filter users by role + do 2 saveUsersToDb
                    filterResult = await filterLosers(tsv_egg_ids, msg)
                    await saveUsersToDb(filterResult.winners, 'tsv_egg', msg, bddmsg.message_id, bddmsg.guild_id);
                    await saveUsersToDb(filterResult.loosers, 'tsv_nexttime', msg, bddmsg.message_id, bddmsg.guild_id);
                    let drawResult = await doDraw(channel, bddmsg.message_id, nbwinners, message);
                    displayWinner(bot, channel, drawResult, message);
                }
                if(reaction._emoji.id === config.reactions.tsv_nexttime) {
                    tsv_nexttime_ids = reaction.users.filter(user => user != bot.user).map(user =>user.id);
                    // filter users by role + do 2 saveUsersToDb
                    saveUsersToDb(tsv_nexttime_ids, 'tsv_nexttime', msg, bddmsg.message_id, bddmsg.guild_id);
                }
            });
        });
  return 0;
}

async function filterLosers(tsv_egg_ids, msg) {
    let winners = [];
    let loosers = [];
    for(let i = 0 ; i < tsv_egg_ids.length ; i++) {
        // todo check roles for users
    }
    return {winners: winners, loosers: loosers}
}

exports.config = {
  names: ["special-draw", "sd"],
  auth: 1,
  usage: `${config.prefix}special-draw <channel> <nb winners> <message>`
}