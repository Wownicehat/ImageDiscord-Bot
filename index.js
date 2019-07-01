// require modules
const Discord = require('discord.js');
const fs = require('fs');

// Start modules / settings
const client = new Discord.Client();
const cooldown = new Set();
const param = JSON.parse(fs.readFileSync('settings.json'));
const commands = require("./commands.js");
commands.RegisterCommands(param);


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log("https://discord.gg/b4VG2GX for support");
});



client.on('message', msg => {

    if (msg.content.startsWith(param.prefix)) {
        if (cooldown.has(msg.author.id)) {
            return;
        }
        var realCommand = msg.content.substring(2, msg.content.length);
        cooldown.add(msg.author.id);
        setTimeout(function () {
            cooldown.delete(msg.author.id);
        }, 5000)
        commands.DoCommand(realCommand).then((r) => {
            if (r == false)
                return;

            if (r == true) {

                var helpmsg = `Prefix : \`${param.prefix}\``;
                for (const key in param.commands) {
                    var value = param.commands[key];
                    var full = key + " - " + value.description;
                    helpmsg += "\n" + full;
                };
                msg.channel.send({
                    embed: {
                        color: Math.floor(Math.random() * 16777214) + 1,
                        title: "ImageDiscord",
                        description: "[Discord](https://discord.gg/b4VG2GX)    [Github](https://github.com/Wownicehat/ImageDiscord-Bot)\n" + helpmsg,
                        "footer": {
                            "name": "Bot by John Duckesent",
                        }
                    }
                });

                return;
            }



            var imgurl = r.url;
            if(imgurl.startsWith("//"))
            {
                imgurl = "http:" + imgurl;
            }
            msg.channel.send({
                embed: {
                    color: Math.floor(Math.random() * 16777214) + 1,
                    description: `[Link](${r.url})`,
                    image: {
                        url: imgurl
                    },
                    footer: {
                        "text": `${r.desc}`
                    },
                    timestamp: new Date()
                }
            }).catch((err) => {
                msg.channel.send({
                    embed: {
                        color: Math.floor(Math.random() * 16777214) + 1,
                        title: "An error as occured",
                        description: "[Discord](https://discord.gg/b4VG2GX)",
                        content: err,
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

        }).catch((err) => {
            msg.channel.send({
                embed: {
                    color: Math.floor(Math.random() * 16777214) + 1,
                    title: "An error as occured",
                    description: "[Discord](https://discord.gg/b4VG2GX)",
                    footer: {
                        "text": `Please contact an administator`
                    },
                    timestamp: new Date()
                }
            });
        });
    }
});
var token = param.token;
if (token == "ENV") {
    console.log("Getting token from env");
    token = process.env.DISCORD_TOKEN;
}
client.login(token);