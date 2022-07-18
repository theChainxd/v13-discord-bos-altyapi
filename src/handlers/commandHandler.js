const fs = require("fs")
const chalk = require("chalk")
const { Collection } = require("discord.js")

module.exports = (client) => {

client.commands = new Collection();
client.aliases = new Collection();

fs.readdir("./src/commands/messageCommands", (err , files) => {
    if(err) {
    console.log(chalk.red("[HATA] commandHandler'de bir problem yaşandı!"));
    console.error(err)
    }
    console.log(chalk.blue("[BİLGİ] " + files.length + " komut yükleniyor!"))
    files
    .filter(x => x.endsWith(".js"))
    .forEach(f => {
        const props = require(`../commands/messageCommands/${f}`)
        client.commands.set(props.conf.name, props);

            props.conf.aliases.forEach(alias => {
                client.aliases.set(alias, props.conf.name);
              });
              console.log(chalk.green(`[BOT] ${props.conf.name} komutu yüklendi!`))
    })
})

}


/* Bu altyapi theChain tarafından yapılmıştır! Eger bir sorun yasar iseniz github profilimden discord profilime ulaşabilirsiniz */
/* Emeğe saygı konusunda altyapıyı kendininiz çalmamanız her türlü daha hoş olur */