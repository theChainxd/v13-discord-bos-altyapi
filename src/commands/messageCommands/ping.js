const Discord = require("discord.js");

module.exports = {
  conf: {
    aliases: ["gecikme"],
    name: "ping",
    owner: true,
    guildOnly:true,
    enabled:true
  },

  run: async (client, message, args,embed) => {
      
      message.reply({content: client.ws.ping + " Güncel pingim!"})
  }
};


/* Bu altyapi theChain tarafından yapılmıştır! Eger bir sorun yasar iseniz github profilimden discord profilime ulaşabilirsiniz */
/* Emeğe saygı konusunda altyapıyı kendininiz çalmamanız her türlü daha hoş olur */
