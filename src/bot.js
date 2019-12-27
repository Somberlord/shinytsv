const Discord = require('discord.js');
const config = require('./config/botconfig');
const fs = require("fs");
const client = new Discord.Client();
client.commands = new Discord.Collection();

function start() {

    fs.readdir('./src/botcommands/', (err, files) => {
        if (err) console.log(err);
    
        let jsfiles = files.filter(f => f.split('.').pop() === 'js');
        if (jsfiles.length <= 0) {
            return console.log("No commands found");
        } else {
            console.log(`${jsfiles.length} commands found.`);
        }
  
        jsfiles.forEach((f, i) => {
        let cmds = require(`./botcommands/${f}`);
        cmds.config.names.forEach((name, i) => {
            client.commands.set(cmds.config.names[i], cmds);
        });
        console.log(`Command ${f} loaded`);
        })
    });

    client.on('ready', () => {
        console.log("Connected as " + client.user.tag);
        console.log("Servers:");
        client.guilds.forEach((guild) => {
            console.log(" - " + guild.name);
        })
        client.user.setActivity("JavaScript")
    
    })
    
    client.on('message', async msg => {
        // Prevent bot from responding to its own messages
        if (msg.author == client.user) return;
        if (msg.channel.type != "text" && msg.channel.type != "dm") return;
        if (!msg.content.startsWith(config.prefix)) return;
    
        let content = msg.content.slice(config.prefix.length).split(" ");
        let args = content.slice(1);
        let cmd = client.commands.get(content[0]);
    
        if (cmd) {
            let output = await cmd.run(client, msg, args)
            .catch(err => {
                console.log(err);
                config.admins.forEach(admin => {
                client.users.get(admin).send(err);
                })
            })
            if (output != 0) {
            msg.reply(`Error: ${output} \n Usage:  ${cmd.config.usage}`)
                .then(mesg => mesg.delete(8000));
            }
            return;
        }
    })
    
    
    
    client.login(config.token);
}

module.exports = start;
