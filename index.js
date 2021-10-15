const { Client, Collection, MessageEmbed} = require("discord.js")

const ms = require("ms")
const fs = require("fs")

const db = require("quick.db")

const chalk = require("chalk")

const token = require("./json/token.json")
const config = require("./json/config.json")

const client = new Client()

client.commands = new Collection();
client.aliases = new Collection();

client.categories = fs.readdirSync("./commands/")

["command"].forEach(handler => {
    require(`./handler/${handler}`)(client)
});

const activities = [
    { name: ``, type: ``},
    { name: ``, type: ``},
    { name: ``, type: ``},
    { name: ``, type: ``}
]

client.on('ready', () => {

    // fs.writeFile('db.txt', JSON.stringify(quickdb.all()), function(e) {
    //     if(e) console.log(e)
    //     console.log('Success!')
    // })
    // Uncomment above if wanting to write all DB stuff into a fle.

    // client.user.setActivity('Game', { type: "COMPETING", type: "CUSTOM_STATUS", type: "LISTENING", type: "PLAYING", type: "STREAMING", type: "WATCHING"})
    // Define all other activity types.

    client.user.setPresence({ status: "online", activity: activities[0] });

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

client.login(token)