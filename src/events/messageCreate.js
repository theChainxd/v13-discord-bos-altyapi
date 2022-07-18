const { MessageEmbed, Message, Collection } = require("discord.js");
const settings = require("../settings/config.json")
const client = global.client;
const chalk = require("chalk")


module.exports = async (message) => {

    // usenmesem cooldown :D
    let prefix = settings.bot.prefix


    if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot) return;
    let args = message.content.substring(prefix.length).trim().split(" ");  // Argları ayıklama
    let commandName = args[0].toLowerCase() // Komut ismi alma

    args = args.splice(1) // Argstan komutu silme

    const embed = new MessageEmbed().setFooter({ text: settings.ozellestirme.footer }).setColor("BLACK").setAuthor({ name: message.member.displayName, iconURL: message.author.avatarURL({ dynamic: true }) });

    let cmd = client.commands.has(commandName) ? client.commands.get(commandName) : client.commands.get(client.aliases.get(commandName)); // Oyle bir komut avr mı diye sorgulamak

    if (cmd) {
        //  Komut sunucuya özel mi ?
        // if(cmd.conf.guildOnly == true && !message.guild){
        //     return message.channel.send({ content:"Bu komut sunucuya özeldir" })
        // }
        // Bu özellik suanlık kapalidir.

        //  Komudu kurucuya ozel yapma
        if (cmd.conf.owner && !settings.ekip.kurucu.includes(message.author.id)) {
            const embed = new MessageEmbed().setFooter({ text: settings.ozellestirme.footer }).setColor("BLACK").setAuthor({ name: message.member.displayName, iconURL: message.author.avatarURL({ dynamic: true }) }).setTitle("Vay çakal senii!").addField("Bu komutu kullanamazsın", "Bu komutu kullanmak için gerekli yetkiye sahip değilsin!", true).setTimestamp();
            return message.reply({ embeds: [embed] })
        }
        // Enabled olmayan komutları ayklama
        if (!settings.ekip.kurucu.includes(message.author.id)) {
            if (cmd.conf.enabled == false) {
                const embed = new MessageEmbed().setFooter({ text: settings.ozellestirme.footer }).setColor("BLACK").setAuthor({ name: message.member.displayName, iconURL: message.author.avatarURL({ dynamic: true }) }).setTitle("Üzgünüm :(").addField("Bu komutu kullanamazsın", "Bu komut şuan herkese açık durumda değil! sonra tekrardan dene", true).setTimestamp();
                return message.reply({ embeds: [embed] })
            }
        }

        const komutLogEmbedi = new MessageEmbed()
            .setTitle(cmd.conf.name + " Komutu kullanıldı")
            .setColor("GREEN")
            .setTimestamp()
            .setFooter({ text: settings.ozellestirme.footer })
            .setDescription(`
   ▫ Komutu Kullanan Kullanıcı : ${message.author.username} **(${message.author.id})**
   ▫ Kullanılan komut ismi : ${cmd.conf.name}
   ▫ Tür : Mesaj
   `)

        try {
            cmd.run(client, message, args, embed, prefix);
            client.channels.cache.get(settings.ozellestirme.kanal.komutLog).send({ embeds: [komutLogEmbedi] })
        } catch (error) {
            console.log(chalk.red("[HATA] bir komut çalıştırılırken bir problem yaşandı!"));
            console.error(error);
            message.reply({ content: 'Komutu çalıştırırken hata ile karşılaştım geliştiricime ulaşın.' });
        }
    } else {
        // Komut bulunamadı - şunu mu demek istediniz?
        const allCommands = [];
        const sameCommands = [];
        client.commands.forEach(cmd => {
            allCommands.push(cmd.conf.name)
            cmd.conf.aliases.forEach(a => {
                allCommands.push(a)
            })
        })
        let slicedCommand = commandName.slice(0, 2)
        allCommands.forEach(command => {
            if (command.startsWith(slicedCommand)) return sameCommands.push(command)
        })
        if (sameCommands.length >= 1) {
            let emed = new MessageEmbed()
                .setTitle("Uh, Oh!")
                .setColor("DARK_RED")
                .setDescription(`Sanırım yanlış bir alana geldin ama üzülme sana gidebileceğin yerleri buldum!`)
                .addField("Gidebileceğin bazı yerler", `**${prefix}** ön eki ile; \n${sameCommands.join(`\n`)}`, true)
                .addField(`Nasıl yolumu bulacağım?`, `${prefix}yardım yazarak yolunuzu bulabilirsinz. \n  Dikkatli olun :)`, true)
                .setFooter({ text: settings.ozellestirme.footer })
                .setTimestamp()
            message.channel.send({ embeds: [emed] })
        } else {
            let emed = new MessageEmbed()
                .setTitle("Uh, Oh!")
                .setColor("DARK_RED")
                .setDescription(`Sanırım yanlış bir alana geldin ama üzülmelisin cunku sana bir yol bulamadim.`)
                .addField("Gidebileceğin bazı yerler!", `Bulunmuyor :( `, true)
                .addField(`Nasıl yolumu bulacağım?`, `${prefix}yardım yazarak yolunuzu bulabilirsinz. dikkatli olun :)`, true)
                .setFooter({ text: settings.ozellestirme.footer })
                .setTimestamp()
            message.channel.send({ embeds: [emed] })
        }
    }
}

// usenmesem cooldown :D
module.exports.conf = {
    name: "messageCreate",
};

/* Bu altyapi theChain tarafından yapılmıştır! Eger bir sorun yasar iseniz github profilimden discord profilime ulaşabilirsiniz */
/* Emeğe saygı konusunda altyapıyı kendininiz çalmamanız her türlü daha hoş olur */