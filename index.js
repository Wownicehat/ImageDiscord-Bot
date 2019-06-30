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
    console.log("https://discord.gg/b4VG2GX for support");
});



client.on('message', msg => {
    if (msg.content.startsWith(param.prefix)) {
        var realCommand = msg.content.substring(2, msg.content.length);
        commands.DoCommand(realCommand).then((r) => {
            if (r == false)
                return;
            console.log(r.url);
            msg.channel.send({
                embed: {
                    color: Math.floor(Math.random() * 16777214) + 1,
                    image: {
                        url: r.url
                    },
                    footer: {
                        "text": `${r.desc} / John-Duckesent`
                    },
                    timestamp: new Date()
                }
            }).catch(()=>{
                msg.channel.send({
                    embed: {
                        color: Math.floor(Math.random() * 16777214) + 1,
                        title: "An error as occured",
                        description: "[Discord](https://discord.gg/b4VG2GX)",
                        image: {
                            url: r.url
                        },
                        footer: {
                            "text": `${r.desc} / ${r.url}`
                        },
                        timestamp: new Date()
                    }
                });
            });
        
        }).catch((err)=>{
            msg.channel.send({
                embed: {
                    color: Math.floor(Math.random() * 16777214) + 1,
                    title: "An error as occured",
                    description: "[Discord](https://discord.gg/b4VG2GX)",
                    image: {
                        url: r.url
                    },
                    footer: {
                        "text": `${r.desc} / ${r.url}`
                    },
                    timestamp: new Date()
                }
            });
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