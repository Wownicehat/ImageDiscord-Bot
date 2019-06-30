// require modules
const Discord = require('discord.js');
const fs = require('fs');

// Start modules / settings
const client = new Discord.Client();
const param = JSON.parse(fs.readFileSync('settings.json'));
const commands = require("./commands.js");
commands.RegisterCommands(param);


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});



client.on('message', msg => {
    if (msg.content.startsWith(param.prefix)) {
        var realCommand = msg.content.substring(2, msg.content.length);
        commands.DoCommand(realCommand).then((r) => {
            if (r == false)
                return;
            msg.channel.send({
                embed: {
                    color: Math.floor(Math.random() * 16777214) + 1,
                    image: {
                        url: r.url
                    },
                    footer: {
                        "text": `${r.desc} / ${r.url}`
                    },
                    timestamp: new Date()
                }
            })
        });
    }
});
var token = param.token;
if(token == "ENV")
{
    console.log("Getting token from env");
    token = process.env.DISCORD_TOKEN;
}
client.login(token);