const db = require("quick.db")
const Discord = require("discord.js")

module.exports = {
    name: "badge",
    category: "Sets a badge to a mentioned user.",
    aliases: ["icon"],
    run: async (client, message, args) => {

        if (message.author.id !== '871877975346405388') return;

        message.delete()

        let badge = (args[0])

        if (badge == "") {
            await db.set()
            const nSuc = new Discord.MessageEmbed()
                .setDescription(``)
                .setColor("BLUE")
            message.channel.send(nSuc)
        } else if (badge == "") {
            await db.set()
            const hSuc = new Discord.MessageEmbed()
                .setDescription(``)
                .setColor("BLUE")
            message.channel.send(hSuc)
        } else if (badge == "") {

        } else {
            message.channel.send('Error! This difficulty is not a global setting or defined!')
        }
    }
}