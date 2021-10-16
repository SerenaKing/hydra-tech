const { MessageEmbed } = require("discord.js")
const color = require("../../json/colors.json")
const emotes = require("../../json/emotes.json")

module.exports = {
	name: "applicationDeny",
	category: "applications",
	description: "Deny the mentioned user to accept their application.",
	aliases: ["deny"],
	usage: "prefix.deny @user [reason]",
	run: async (client, message, args) => {

		message.delete()

		const mentionedUser = message.mentions.members.first() || message.guild.members.cache.get(args[0])

		if (!mentionedUser) {
			return message.channel.send(`❌ - You didn't mention a user to accept.`)
		}

		const embed = new MessageEmbed()
			.setTitle(`Hydra Tech | Application Denied`)
			.setColor(color.red)
			.setThumbnail(`https://cdn.discordapp.com/attachments/889929810825056327/898847485911523378/HT_Gif.gif`)
			.setDescription(`
Hello, <@!${mentionedUser.id}>

Your application was denied for *Hydra Tech*.

**Your Information**
Username: ${mentionedUser.user.username}
User ID: ${mentionedUser.user.id}
AvatarURL: ${mentionedUser.user.displayAvatarURL()}

**Staff Information**
Username: ${message.author.username}
User ID: ${message.author.id}
AvatarURL: ${message.author.displayAvatarURL()}

Thank you for your interest in our application!

The reason you where denied.
\`\`\`
${args.slice(1).join(" ")}
\`\`\`

- Regards,
Hydra Tech System
			`)
			.setFooter(message.author.tag, message.author.displayAvatarURL())
			.setTimestamp()
		message.channel.send(embed)
	}
}