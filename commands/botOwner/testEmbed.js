const { MessageEmbed } = require("discord.js")

module.exports = {
	name: "testEmbed",
	category: "Owner",
	aliases: ["tembed"],
	description: "Multiple entries of embed fields to connect with API.",
	usage: "prefix.testEmbed",
	run: (client, message, args) => {

		message.delete()

		const embed = new MessageEmbed()
			.setTitle(`Test Embed!`)
			.setColor("RED")
			.setThumbnail(`https://cdn.discordapp.com/attachments/889929810825056327/898847485911523378/HT_Gif.gif`)
			.setDescription(`Just loading a static embed.`)
			.setFooter(`Embed testing!`)
			.setTimestamp()
		message.channel.send(embed)
	}
}