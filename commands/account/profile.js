const Discord = require('discord.js')
const db = require('quick.db')
const moment = require('moment')
const { createTag } = require('common-tags')

module.exports = {
    name: "profile",
    category: "account",
    description: "Shows a user profile",
    aliases: ["p"],
    run: async (client, message, args) => {

        message.delete()

        // Variables
        const mem = message.author
        const mentionedMember = message.mentions.members.first();

        // Database Fetch (Self) (Badges)
        // const Norml = db.fetch(`bot.difficulty.Normal`)

        var desc = db.get(`desc.${mem.id}`);
        if (desc == null) {
                desc = "This user doesn't have a description set."
        }

        var username = db.get(`user.username.${mem.id}`);
        if (username == null) {
                username = "None Set"
        }

    
        const em = new Discord.MessageEmbed()
        em.setTitle(`${message.author.username}'s Profile`)
        em.setDescription(`This has to be changed to something. But what?`)
        em.addField('❯ User Information', (`
**Username:**
*${username}*

**Description:**
*${desc}*
`))
        em.addField(`❯ | Difficulty`, (`
        `))
        em.setFooter(message.author.username, message.author.displayAvatarURL())
// Normal: ${Norml || "<:CROSSED:881140525929992193>"}

        /* ============================================================================================================== */


        if (!mentionedMember) return message.channel.send(em)

        // Database Fetch (Mentioned) (Badges)
        // const Norml1 = db.fetch(`bot.difficulty.Normal`)

        var desc1 = db.get(`desc.${mentionedMember.id}`);
        if (desc1 == null) {
                desc1 = "This user doesn't have a description set."
        }

        var username1 = db.get(`user.username.${mentionedMember.id}`);
        if (username1 == null) {
                username1 = "None Set"
        }

        const emm = new Discord.MessageEmbed()
        emm.setTitle(`${mentionedMember.user.username}'s Profile`)
        emm.setDescription(`This has to be changed to something. But what?`)
        emm.addField('❯ User Information', (`
**Username:** 
*${username1}*
        
**Description:**
*${desc1}*
      `))
        emm.addField(`Difficulty`, (`

        `))
        // Normal: ${Norml1 || "<:CROSSED:881140525929992193>"}
        emm.setFooter(mentionedMember.user.username, mentionedMember.user.avatarURL())
        if (mentionedMember) return message.channel.send(emm)
    }
}