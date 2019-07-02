const request = require('request-promise');
const randlow = /RL\{(\d*),(\d*)\}/;
const randupp = /RU\{(\d*),(\d*)\}/;
const randint = /RI\{(\d*),(\d*)\}/;
const randmix = /RX\{(\d*),(\d*)\}/;

function makerandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makestringlower(min, max) {
    var length = makerandom(min, max);
    var result = '';
    var characters = 'abcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++)
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    return result;
}

function makestringupper(min, max) {
    var length = makerandom(min, max);
    var result = '';
    var characters = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase();
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++)
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    return result;
}

function makestringmixt(min, max) {
    var length = makerandom(min, max);
    var result = '';
    var characters = 'abcdefghijklmnopqrstuvwxyz';
    characters = +characters.toUpperCase();
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++)
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    return result;
}
/**
 * Do the requests
 *
 * @param {*} cmd
 * @returns
 */
function DoRequests(cmd) {
    return new Promise(async (resolve) => {
        var curl = undefined;

        for (let index = 0; index < cmd.steps.length; index++) {
            var s = cmd.steps[index];

            if (curl == undefined) {
                var preurl = s.url;
                // - Random LowerCase RL{min,max}
                e = randlow.exec(preurl);
                if (e != undefined) {
                    var id = makestringlower(parseInt(e[1], 10), parseInt(e[2], 10));
                    console.log(id);
                    preurl = preurl.replace(randlow, id);
                }
                // - Random UpperCase RU{min,max}
                e = randupp.exec(preurl);
                if (e != undefined) {
                    var id = makestringupper(parseInt(e[1], 10), parseInt(e[2], 10));
                    console.log(id);
                    preurl = preurl.replace(randupp, id);
                }
                // - Random int RI{min,max}
                e = randint.exec(preurl);
                if (e != undefined) {
                    var id = makerandom(parseInt(e[1], 10), parseInt(e[2], 10));
                    console.log(id);
                    preurl = preurl.replace(randint, id);
                }
                // - Random mixt RI{min,max}
                e = randmix.exec(preurl);
                if (e != undefined) {
                    var id = makestringmixt(parseInt(e[1], 10), parseInt(e[2], 10));
                    console.log(id);
                    preurl = preurl.replace(randmix, id);
                }
                curl = preurl;
            }
            var a, b, body = await request({
                url: curl,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'
                }
            });
            var regex = new RegExp(s.regex);
            var g1 = regex.exec(body)[1]; // get group
            curl = g1;
        }
        resolve(curl);
    });
}
module.exports = {
    RegisterCommands: function (param) {
        console.log("Registering commands. . .");
        this.commands = param.commands;
    },
    DoCommand: function (command) {
        if (command == "help") {
            return new Promise((r) => {
                console.log("Sending help. . .");
                r(true);
            });
        }
        var cmd = this.commands[command];
        if (cmd == undefined)
            return new Promise((r) => {
                r(false)
            }); // empty promise

        return new Promise((resolve) => {
            DoRequests(cmd).then((curl) => {
                resolve({
                    url: curl,
                    desc: cmd.description
                });
            });
        });
    }
}