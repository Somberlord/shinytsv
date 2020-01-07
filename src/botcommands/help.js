const config = require("../config/botconfig");

exports.run = async (bot, msg, args) => {
  msg.channel.send("!tl <channel> <nb winners> <message>\n!wm <channel> <message>");
  return 0;
}

exports.config = {
  names: ["help", "h"],
  auth: 1,
  usage: `${config.prefix}help`
}