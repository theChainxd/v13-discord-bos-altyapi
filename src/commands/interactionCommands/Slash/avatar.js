const { SlashCommandBuilder, hyperlink } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageSelectMenu, IntegrationApplication } = require("discord.js");
const client = global.client;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Kullanıcının yada sizin avatarınızı gönderir.")
    .addStringOption((option) =>
      option
        .setName("kişi")
        .setDescription("Avatarına bakmak istediğiniz üyeyi belirtiniz.")
    ),
  async execute(interaction, client) {

    const member = interaction.options.getString('kişi') || interaction.member;
    if (isNaN(member)) {
      return interaction.reply({ content: ':x: Kullanıcı id si bir sayı olmalıdır.', ephemeral: true });
    }
    try {
      await client.users.fetch(member);
    } catch (e) {
      return interaction.reply({ content: ":x: Böyle bir kullanıcı bulunamadı.", ephemeral: true });
    }
    const fetchUser = await client.users.fetch(member);
    await fetchUser.fetch();

    interaction.reply({ content: `> ${hyperlink(`${fetchUser.tag}`, fetchUser.displayAvatarURL({ dynamic: true, size: 4096 }))}` })
    var filter = (menu) => menu.user.id === interaction.user.id;
    const collector = interaction.channel.createMessageComponentCollector({ filter, componentType: 'SELECT_MENU', max: 1, time: 20000 });

    collector.on("collect", async (menu) => {
      if (menu.values[0] === "banner") {
        let banner = await bannerXd(fetchUser.id, client)
        menu.reply({ content: `> ${hyperlink(`${fetchUser.tag}`, `${banner}`)}`, ephemeral: true })
      }
    })

  }
};

/* Bu altyapi theChain tarafından yapılmıştır! Eger bir sorun yasar iseniz github profilimden discord profilime ulaşabilirsiniz */
/* Emeğe saygı konusunda altyapıyı kendininiz çalmamanız her türlü daha hoş olur */