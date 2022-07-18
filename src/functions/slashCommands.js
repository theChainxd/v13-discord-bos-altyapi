const settings = require("../settings/config.json")
const { MessageEmbed } = require("discord.js")
const chalk = require("chalk")

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const rest = new REST({ version: '9' }).setToken(settings.bot.token);

const slash = {
    load: async (commands, guild) => {
        const rest = new REST({ version: '9' }).setToken(settings.bot.token);
        (async () => {
            try {
                console.log(chalk.blue('[BOT] ' + guild.name + ' sunucusuna Slash ve Komutlar yükleniyor.'));
                await rest.put(
                    Routes.applicationGuildCommands(settings.bot.clientID, guild.id),
                    { body: commands },
                ).then(() => {
                    console.log(chalk.green('[BOT] ' + guild.name + ' sunucusuna Slash ve Context Komutlar yüklendi.'));
                });
            }
            catch (e) {
                const guildOwner = guild.ownerId
                let destek = await settings.ozellestirme.desteksunucusu

                let hataEmbedi = new MessageEmbed()
                .setTitle("Merhaba değerli kullanıcımız!")
                .setColor("RED")
                .setDescription(`
                Botumuzu eklediğiniz zaman eğik çizgi (/) Komutları eklemeden eklemişsiniz.
                Bu şekil eklemediğiniz için botumuzda teknik hatalar ve sunucuda eğik çizgi (/) komutları oluşturamıyoruz
                Ama [Endişelenmeyin buradan bu hatayı düzeltebilirsiniz](https://discord.com/api/oauth2/authorize?client_id=990195890813808680&permissions=8&scope=bot%20applications.commands)
                **Bot sunucudan ayrılacaktır. Siz linkten tekrar ekleyiniz**
                `)
                .addField("Sunucunuzu seçin","Linki açtıktan sonra olduğunuz sunucuyu seçin!")
                .addField("Destek sunucumuz",`[Buradan ulaşabilirsiniz](${destek})`)
                .setFooter({text : settings.ozellestirme.footer})
                .setTimestamp()
               await client.users.cache.get(guildOwner).send({embeds:[hataEmbedi]}).catch((e) => console.log(chalk.red(e)));
               await guild.leave()
               console.log(chalk.red('[BOT] ' + guild.name + ' sunucusuna Slash ve Context Komutlar yüklenemedi çünkü iznim yoktu!.'));
            }
        })();
    },
    delete: async (guild, commandID) => {

    }
}

module.exports = slash;

/* Bu altyapi theChain tarafından yapılmıştır! Eger bir sorun yasar iseniz github profilimden discord profilime ulaşabilirsiniz */
/* Emeğe saygı konusunda altyapıyı kendininiz çalmamanız her türlü daha hoş olur */