const { MessageEmbed } = require("discord.js")

module.exports = {
	name: "testMessage",
	category: "Owner",
	aliases: ["tmsg"],
	description: "Sending a message to the used channel.",
	usage: "prefix.testMessage",
	run: (client, message, args) => {

		message.delete()

		message.channel.send(`Just a random message! Check embeds using \`prefix.tembed\``)
	}
}