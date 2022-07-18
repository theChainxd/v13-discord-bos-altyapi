const { SlashCommandBuilder, hyperlink } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageSelectMenu, IntegrationApplication , MessageButton} = require("discord.js");
const client = global.client;

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Botun güncel pingini gösterir"),

async execute(interaction,client){

    // interaction.reply({content: `> ${ hyperlink(`efwefhwefhhg`, `https://discord.gg/ffXnybWt`)}`, ephemeral: true })

    const embed = new MessageEmbed()
    .setTitle("Güncel Ping")
    .setDescription("Güncel ping " + client.ws.ping)
    interaction.reply({ content:"> :ping_pong:",embeds: [embed] , ephemeral: true })
}
}

/* Bu altyapi theChain tarafından yapılmıştır! Eger bir sorun yasar iseniz github profilimden discord profilime ulaşabilirsiniz */
/* Emeğe saygı konusunda altyapıyı kendininiz çalmamanız her türlü daha hoş olur */