const fs = require("fs")
const chalk = require("chalk")
const { Collection } = require("discord.js")
const settings = require("../settings/config.json")
const client = global.client


module.exports = (client) => {

    client.slashcommands = new Collection();
    var slashcommands = global.slashcommands = [];

    fs.readdirSync('./src/commands/interactionCommands').forEach(async category => {
        const commands = fs.readdirSync(`./src/commands/interactionCommands/${category}/`).filter(cmd => cmd.endsWith('.js'));
        for (const command of commands) {
            const Command = require(`../commands/interactionCommands/${category}/${command}`);
            client.slashcommands.set(Command.data.name, Command);
            slashcommands.push(Command.data.toJSON());
        }
    }); 
}

/* Bu altyapi theChain tarafından yapılmıştır! Eger bir sorun yasar iseniz github profilimden discord profilime ulaşabilirsiniz */
/* Emeğe saygı konusunda altyapıyı kendininiz çalmamanız her türlü daha hoş olur */