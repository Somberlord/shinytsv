const config = require("../config/botconfig");

exports.run = async (bot, msg, args) => {
  msg.channel.send(bot.ping + "ms");
  return 0;
}

exports.config = {
  names: ["ping", "pi"],
  auth: 1,
  usage: `${config.prefix}ping`
}