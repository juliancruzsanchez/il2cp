module.exports = function  (data, server) {
    if (String(data).includes("is complete created")) {
        var r = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;
        let ip = String(data).match(r)[0];
        let un = String(data).split(",")[2].replace(/\s+/g, '');
        console.log(ip,un)
        server.exec(`chat Welcome ${un} to JagerOne TO ${un}`)
    }
}