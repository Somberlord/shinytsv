const conf = require('./config/config');
const constants = require('./config/configConstants');
const appstart = require('./app');
const botstart = require('./bot');

if(conf.start.includes(constants.WEB)) {
    appstart();
}
if( conf.start.includes(constants.BOT)) {
    botstart();
}
