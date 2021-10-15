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
            .setTitle(``)
    }
}