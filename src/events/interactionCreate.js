const chalk = require("chalk");
var settings = require("../settings/config.json")
let slashcommands = global.slashcommands
let slashFunction = require("../functions/slashCommands")
let client = global.client
const { MessageEmbed, Message, Collection } = require("discord.js");


module.exports = async (interaction) => {



  if (interaction.isContextMenu() || interaction.isCommand()) {
    const command = client.slashcommands.get(interaction.commandName);
    if (interaction.user.bot) return;
    if (!interaction.inGuild() && interaction.isCommand()) return interaction.editReply({ content: 'Komutları kullanmak için bir sunucuda olmanız gerekir.' });
    if (!command) return interaction.reply({ content: 'Bu komut kullanılamıyor.', ephemeral: true }) && client.slashcommands.delete(interaction.commandName);

    const komutLogEmbedi = new MessageEmbed()
      .setTitle(command.data.name + " interaction'u kullanıldı")
      .setColor("GREEN")
      .setTimestamp()
      .setFooter({ text: settings.ozellestirme.footer })
      .setDescription(`
   ▫ İnteraction'u Kullanan Kullanıcı : ${interaction.user.username} **(${interaction.user.id})**
   ▫ Kullanılan inreaction ismi : ${command.data.name}
   ▫ Tür : İnteraction
   `)

    try {
      command.execute(interaction, client);
      client.channels.cache.get(settings.ozellestirme.kanal.komutLog).send({ embeds: [komutLogEmbedi] })
    }
    catch (e) {
      console.log(e);
      return interaction.reply({ content: `An error has occurred.\n\n**\`${e.message}\`**` });
    }
  }
}
module.exports.conf = {
  name: "interactionCreate",
};

/* Bu altyapi theChain tarafından yapılmıştır! Eger bir sorun yasar iseniz github profilimden discord profilime ulaşabilirsiniz */
/* Emeğe saygı konusunda altyapıyı kendininiz çalmamanız her türlü daha hoş olur */