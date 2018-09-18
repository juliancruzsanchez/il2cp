module.exports = function (data, server) {
  let input = String(data);
  // Welcomes users
  if (input.includes("is complete created")) {
    var r = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;
    let ip = input.match(r)[0];
    let un = input.split(",")[2].replace(/\s+/g, '');
    console.log(ip, un);
    server.exec(`chat Welcome ${un} to JagerOne TO ${un}`);
  }
  // Timeleft
  else if (input.includes("<tl")) {
      server.exec(`chat Not Yet Implemented`);
    }
    // Help
    else if (input.includes("<?")) {
        server.exec(`chat Not Yet Implemented`);
      }
      // Returns next map
      else if (input.includes("<nextmap")) {
          server.exec(`chat Not Yet Implemented`);
        }
        // Returns version
        else if (input.includes("<version")) {
            server.exec(`chat Not Yet Implemented`);
          }
          // Returns stats
          else if (input.includes("<stat")) {
              server.exec(`chat Not Yet Implemented`);
            }
};
