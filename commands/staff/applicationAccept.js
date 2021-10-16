const { MessageEmbed } = require("discord.js")
const color = require("../../json/colors.json")
const emotes = require("../../json/emotes.json")

module.exports = {
	name: "applicationAccept",
	category: "applications",
	description: "Accept the mentioned user to accept their application.",
	aliases: ["accept"],
	usage: "prefix.accept @user",
	run: async (client, message, args) => {

		message.delete()

		const mentionedUser = message.mentions.members.first() || message.guild.members.cache.get(args[0])

		const embed = new MessageEmbed()
			.setTitle(`Hydra Tech | Application Accepted`)
			.setColor(color.green)
			.setThumbnail(`https://cdn.discordapp.com/attachments/889929810825056327/898847485911523378/HT_Gif.gif`)
			.setDescription(`
Hello, <@!${mentionedUser.id}>

Your application was accepted for *Hydra Tech*.

**Your Information**
Username: ${mentionedUser.user.username}
User ID: ${mentionedUser.user.id}
AvatarURL: ${mentionedUser.user.displayAvatarURL()}

**Staff Information**
Username: ${message.author.username}
User ID: ${message.author.id}
AvatarURL: ${message.author.displayAvatarURL()}

Thank you for your interest in our application!

- Regards,
Hydra Tech System
			`)
			.setFooter(message.author.tag, message.author.displayAvatarURL())
			.setTimestamp()
		message.channel.send(embed)
	}
}