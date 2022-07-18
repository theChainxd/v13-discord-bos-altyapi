const chalk = require("chalk");
var settings = require("../settings/config.json")
let client = global.client
const { MessageEmbed } = require("discord.js")


module.exports =  async(client) => {


let oyunlar = settings.ozellestirme.event.events  
let tip = settings.ozellestirme.event.type
let status = settings.ozellestirme.event.status

setInterval(() => {
    var randomSayi = Math.floor(Math.random() * oyunlar.length)
    let event = oyunlar[randomSayi]
    client.user.setPresence({ activities: 
        [{
         name: event, 
         type: tip 
        }], 
        status: status 
    })
}, 30 * 100);

// Load slash commands
let slashcommands = global.slashcommands
let slashFunction = require("../functions/slashCommands")
client.guilds.cache.forEach(element => {
    slashFunction.load(slashcommands,element)
});
// Load slash commands
let tarih = new Date()
let saat = tarih.getHours()
let min = tarih.getMinutes()
let sec = tarih.getSeconds()

const reConnectedEmbed = new MessageEmbed()
.setAuthor({name:client.user.username,iconURL:client.user.avatarURL({dynamic:true})})
.setColor("AQUA")
.setTitle("Bot Tekrardan Bağlandı!")
.setDescription(saat + ":" + min + ":" + sec)
.setFooter({text:settings.ozellestirme.footer})


await console.log(chalk.magenta("[BOT] " + client.user.username + " ile giriş yapıldı!"))
client.channels.cache.get(settings.ozellestirme.kanal.connectedLog).send({ embeds: [reConnectedEmbed] })  // Her bağlandiginda mesaj atar isterseniz kapatin
}

module.exports.conf = {
    name: "ready",
  };

  /* Bu altyapi theChain tarafından yapılmıştır! Eger bir sorun yasar iseniz github profilimden discord profilime ulaşabilirsiniz */
/* Emeğe saygı konusunda altyapıyı kendininiz çalmamanız her türlü daha hoş olur */