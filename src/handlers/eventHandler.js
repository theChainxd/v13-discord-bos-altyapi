const fs = require("fs")
const chalk = require("chalk")

let onceEvents = ["ready"]

module.exports = (client,settings,rest) => {
    fs.readdir("./src/events" , (err, files) => {
        if(err){ 
            console.log(chalk.red("[HATA] eventHandler'de bir problem yaşandı!"));
            console.error(err)
        }
        console.log(chalk.blue(`[BİLGİ] ${files.length} event yükleniyor!`))
        files
        .filter(x => x.endsWith(".js"))
        .forEach((file) => {
            let prop = require(`../events/${file}`)
            if(!prop.conf) console.log(chalk.red(`[HATA] ${prop} eventinde config bulunamadı!`));
            if(prop.conf.name == onceEvents) {
                client.once(prop.conf.name , prop) 
            } else {
                client.on(prop.conf.name,prop)
            }
            console.log(chalk.green("[BOT] " + file + " eventi yüklendi!"))
        }); 
    })
}

/* Bu altyapi theChain tarafından yapılmıştır! Eger bir sorun yasar iseniz github profilimden discord profilime ulaşabilirsiniz */
/* Emeğe saygı konusunda altyapıyı kendininiz çalmamanız her türlü daha hoş olur */