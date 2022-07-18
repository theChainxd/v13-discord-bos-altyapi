const { MessageEmbed } = require("discord.js")
var settings = require("../settings/config.json")

const client = global.client

module.exports = (guild) => {

    const newGuildEmbed = new MessageEmbed()
        .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL({ dynamic: true }) })
        .setColor("LIGHT_GREY")
        .setTitle(`${guild.name} sunucusuna katıldım!`)
        .setDescription(`
   ▫ Sunucuda ki kişi sayısı : ${guild.memberCount}
   `)
        .setFooter({ text: settings.ozellestirme.footer })
        .setTimestamp()
    client.channels.cache.get(settings.ozellestirme.kanal.eklendiAtildi).send({ embeds: [newGuildEmbed] })


    // Load slash commands
    let slashcommands = global.slashcommands
    let slashFunction = require("../functions/slashCommands")
    slashFunction.load(slashcommands, guild)
    // Load slash commands

}
module.exports.conf = {
    name: "guildCreate"
}


/* Bu altyapi theChain tarafından yapılmıştır! Eger bir sorun yasar iseniz github profilimden discord profilime ulaşabilirsiniz */
/* Emeğe saygı konusunda altyapıyı kendininiz çalmamanız her türlü daha hoş olur */