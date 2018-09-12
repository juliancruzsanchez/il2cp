const telnet = require('telnet-client');

const server = new telnet();
module.exports = {
    init() {
        server.on("data", function (data) {
            if  (String(data).includes("complete created")) () => {
                var r = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;
                console.log(String(data).match(r)); console.log("NEW PLAYER")
            }
            if  (String(data).includes("joins the game")) console.log("NEW PLAYER")
        });
        server.connect({
            host: "192.168.1.3",
            port: 2003,
            stripShellPrompt: true,
            irs: "\r\n"
        });
    },
    setDifficulty(diff) {
        server.exec("difficulty", diff)
    },
    getUsers() {
        server.send("user\r", {}, (a, b) => {
            let fo = String(b).replace("\\u0020", "").replace("<consoleN>", "").replace(/<([1-9]*)>/i, "").split("\\n\r\n")
            fo.pop()
            console.log(fo)
        })
    },
    getMissions() {
        //passsing directoryPath and callback function
        fs.readdir(directoryPath, function (err, files) {
            //handling error
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }
            //listing all files using forEach
            files.forEach(function (file) {
                // Do whatever you want to do with the file
                console.log(file);
            });
        });
    }
}