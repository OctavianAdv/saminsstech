const {Collection, Client, Discord, MessageEmbed} = require('discord.js')
const fs = require('fs')
const client = new Client({
    disableEveryone: true
})
const config = require('./config.json')
const prefix = config.prefix
const token = config.token
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
}); 
client.on('ready', () => {
    client.user.setActivity(`${prefix}help, watching how octavian coded me. :whack:`)
    console.log(`${client.user.username} ✅`);

    const statusarray = [
        `get good`,
        `get saminss tweaks`,
        `i have low latency + Fps boost`,
        `low input deelay`
    ];

    let index = 0;
    setInterval(() => {
        if(index === statusarray.length) index = 0;
        const status = statusarray[index];
        console.log(status);
        client.user.setActivity(status);
        index++;
    }, 4500);
})

client.on('guildMemberAdd', async(member) => {
    const canal = member.guild.channels.cache.get('818567516926378014')

    const embed = new MessageEmbed()
    .setColor('PURPLE')
    .setTitle('Noul golan')
    .setDescription(`**${member.displayName}** welcome to ${member.guild.name}, avem acu ${member.guild.memberCount} members`)
    channel.send(embed)
})

client.on('guildMemberRemove', async(member) => {
    const canal = member.guild.channels.cache.get('818567516926378014')

    const embed = new MessageEmbed()
    .setColor('RED')
    .setTitle('un membru a parasit pizda lu ma ta :( trist #tristete')
    .setDescription(`**${member.displayName}** a parasit pizda lu ma-ta ${member.guild.name}, acu avem locuitori in pizda la ma sa ${member.guild.memberCount} members`)
    channel.send(embed)
})

client.on('message', async message =>{
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0 ) return;
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if(command) command.run(client, message, args) 
})
client.login(token)
