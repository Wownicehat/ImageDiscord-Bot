const request = require('request-promise');

function DoRequests(cmd) {
    return new Promise(async (resolve) => {
        var curl = undefined;

        for (let index = 0; index < cmd.steps.length; index++) {
            var s = cmd.steps[index];
            if (curl == undefined) {
                curl = s.url;
            }
            var a,b,body = await request(curl);
            var regex = new RegExp(s.regex);
            var g1 = regex.exec(body)[1]; // get group1
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