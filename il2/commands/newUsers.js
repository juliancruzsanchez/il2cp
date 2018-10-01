module.exports= function(input, il2){  
    try {
      var r = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/
      let ip = input.match(r)[0]
      let un = input.split(",")[2].replace(/\s+/g, '')
      console.log(ip, un)
      il2.chat(`Welcome ${un} to JagerOne`, un)
    } catch (error) {
      console.error(error)
    }
  }