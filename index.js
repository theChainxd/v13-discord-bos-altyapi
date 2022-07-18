/* 
/---/ RENK ŞEMASI /---/ ;
GREEN = BAŞARILI İŞLEM
RED = BAŞARISIZ İŞLEM
BLUE = BİLGİ VEREN İŞLEM 
/---/ RENK ŞEMASI /---/ ;
*/

const Discord = require("discord.js")
let client = (global.client = new Discord.Client({intents: [131071]}))
const fs = require("fs")
const settings = require("./src/settings/config.json")
const chalk = require("chalk")

// const buttons = require("discord-buttons")
// buttons(client)

let handlerFiles = fs.readdirSync(`./src/handlers/`).filter(x => x.endsWith(".js"))
handlerFiles.forEach(file => {
    require("./src/handlers/" + file)(client,settings)
})

client
.login(settings.bot.token)
.catch(() => console.log(chalk.red("[HATA] Bot Bağlanamadı!")));

/* Bu altyapi theChain tarafından yapılmıştır! Eger bir sorun yasar iseniz github profilimden discord profilime ulaşabilirsiniz */
/* Emeğe saygı konusunda altyapıyı kendininiz çalmamanız her türlü daha hoş olur */