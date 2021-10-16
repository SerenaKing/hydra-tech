const { Client, Collection, MessageEmbed} = require("discord.js")

const ms = require("ms")
const fs = require("fs")

const db = require("quick.db")

const chalk = require("chalk")

const botConfig = require("./json/token.json")
const { prefix } = require("./json/config.json")

const client = new Client();

client.commands = new Collection();
client.aliases = new Collection();

client.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
    require(`./handler/${handler}`)(client);
});

const activities = [
    { name: `the server`, type: `WATCHING`},
    { name: `in the CAD industry!`, type: `COMPETING`},
    { name: `games that we all enjoy!`, type: `PLAYING`},
    { name: `the server logs. Shush!`, type: `LISTENING`}
]

client.on('ready', () => {

    // fs.writeFile('db.txt', JSON.stringify(quickdb.all()), function(e) {
    //     if(e) console.log(e)
    //     console.log('Success!')
    // })
    // Uncomment above if wanting to write all DB stuff into a fle.

    // client.user.setActivity('Game', { type: "COMPETING", type: "CUSTOM_STATUS", type: "LISTENING", type: "PLAYING", type: "STREAMING", type: "WATCHING"})
    // Define all other activity types.

    client.user.setPresence({ status: "dnd", activity: activities[0] });

    let activity = 1;

    setInterval(() => {
        activities[4] = { name: `H!help | ${client.guilds.cache.size} guilds`, type: 'WATCHING' };
        activities[5] = { name: `H!help | ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} users`, type: 'WATCHING' }; 
        if (activity > 5) activity = 0;
        client.user.setActivity(activities[activity]);
        activity++;
    }, 10000);

    setTimeout(async function () {
        console.log(chalk.white(`[${chalk.green(`INFO`)}${chalk.white(`] - Connecting...`)}`));
    }, ms('1s'));
    setTimeout(async function () {
        console.log(chalk.white(`[${chalk.green(`INFO`)}${chalk.white(`] - Logged in as: ${client.user.tag}`)}`));
    }, ms('3s'));
})

client.on("message", async message => {
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member)
        message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) command.run(client, message, args);

});

client.on("guildMemberAdd", async (member) => {
    const memberBadge = db.fetch('')

    const welcomeChannel = member.guild.channels.cache.get("")
    const welcomeRole = member.guild.roles.cache.get("")

    member.roles.add(welcomeRole)

    const embed = new MessageEmbed()
        .setTitle(`Hydra Tech | Welcome`)
        .setColor("BLUE")
        // .setImage()
        .setThumbnail(`https://i.imgur.com/QVQrXz8.mp4`)
        .setDescription(`
Welcome, <@!${member.user.id}>
        `)
        .setFooter(member.user.id, member.user.displayAvatarURL())
        .setTimestamp()
    welcomeChannel.send(`<@!${member.user.id}>`, {
        embed: embed
    })
        .then(await db.set(`user.badge.memberBadge`, ''))
})

client.login(botConfig.token)