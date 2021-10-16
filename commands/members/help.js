const { MessageEmbed } = require("discord.js")
const color = require("../../json/colors.json")
const emotes = require("../../json/emotes.json")

module.exports = {
    name: "help",
    description: "Shows which commands can be executed.",
    category: "Public",
    usage: "prefix.help",
    run: (client, message, args) => {

        message.delete()

        const embed = new MessageEmbed()
            .setTitle(`Hydra Tech | Bot Support`)
            .setColor(color.green)
            .setThumbnail(`https://cdn.discordapp.com/attachments/889929810825056327/898847485911523378/HT_Gif.gif`)
            .setDescription(`
**Member Commands**
help - Shows this embed.

**Staff Commands**
accept - Accept an application.
deny - Deny an application.

**Account Commands**
profile - See your or a mentioned users profile
name - Set a name in your profile
description - Set a description for your profile
            `)
            .setFooter(message.author.tag, message.author.displayAvatarURL())
            .setTimestamp()
        message.channel.send(embed)
    }
}