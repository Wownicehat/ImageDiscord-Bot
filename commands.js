const request = require('request-promise');
const rdmidregex = /R\{(\d*)\}/;
function makestring(length)
{
	var result           = '';
	var characters       = 'abcdefghijklmnopqrstuvwxyz';
	var charactersLength = characters.length;
	for ( var i = 0; i < length; i++ )
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	return result;
}
function DoRequests(cmd) {
    return new Promise(async (resolve) => {
        var curl = undefined;

        for (let index = 0; index < cmd.steps.length; index++) {
            var s = cmd.steps[index];
            
            if (curl == undefined) {
                var preurl = s.url;
                var e = rdmidregex.exec(preurl);
                if (e != undefined)
                {
                    var id = makestring(parseInt(e[1], 10));
                    preurl = preurl.replace(rdmidregex, id);
                }
                curl = preurl;
            }
            var a,b,body = await request({
                url: curl,
                headers:
                {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'
                }});
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
        var cmd = this.commands[command];
        if (cmd == undefined)
            return new Promise((r) => {
                r(false)
            }); // empty promise
        console.log("Executing " + command);
        return new Promise((resolve) => {
            var curl = DoRequests(cmd).then((curl) => {
                resolve({
                    url: curl,
                    desc: cmd.description
                });
            });
        });
    }
}