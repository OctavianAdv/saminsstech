const {Collection, Client, Discord, MessageEmbed} = require('discord.js')
const fs = require('fs')
const config = require('./config.json')
const client = new Client({
    disableEveryone: true
})
const prefix = config.prefix
const token = config.token                                      
client.config = config
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
}); 
client.on('ready', () => {
    console.log(`${client.user.username} ✅`);

    const statusarray = [
        `get good`,
        `watching to saminss club`,
        `get saminss tweaks`,
        `i have low latency + Fps boost`,
        `low input deelay`
    ];

    let index = 0;
    setInterval(() => {
        if(index === statusarray.length) index = 0;
        const status = statusarray[index];
        client.user.setActivity(status);
        index++;
    }, 4500);
})

client.on('guildMemberAdd', async(member) => {
    const Channel = member.guild.channels.cache.get('776562193256546325')
    const embed = new MessageEmbed()
    .setColor('RED')
    .setTitle('NEW Member')
    .setDescription(`${member.diplayName} ** welcome to ${member.guild.name} we have now ${member.guild.memberCount}`)
    Channel.send(embed)
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

//music >> 
const distube = require("distube");
const player = new distube(client);

player.on("playSong", (message, queue, song) => {
    message.channel.send(`${song.name} a inceput sa cante`);
    const embed = new MessageEmbed()
        .setTitle('Now Playing')
        .setDescription(`${song.name}`)
        .setFooter(`Requested by ${message.author.tag}`)
        message.channel.send(embed);
});
client.player = player;
//music <<
const { GiveawaysManager } = require('discord-giveaways')
client.giveaways = new GiveawaysManager(client, {
    storage: './giveaway.json',
    updateCountdownEvery: 5000,
    embedColor: '#408080',
    reaction : '🎉'
})
client.login(token)
