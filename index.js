const {Collection, Client, Discord, MessageEmbed, Intents} = require('discord.js')
const fs = require('fs')
const config = require('./config.json')
const client = new Client({
    partials: ["CHANNEL", "MESSAGE", "GUILD_MEMBER", "REACTION"],
    intents: 32767,
});
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
        `WE`,
        `ARE`,
        `{NAME}`
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
const prefixSchema = require('./models/prefix')

client.prefix = async function(message) {
        let custom;

        const data = await prefixSchema.findOne({ Guild : message.guild.id })
            .catch(err => console.log(err))
        
        if(data) {
            custom = data.Prefix;
        } else {
            custom = prefix;
        }
        return custom;
    }
    
client.on('message', async message => {
    const p = await client.prefix(message)
    if(message.mentions.users.first()) {
        if(message.mentions.users.first().id === '717407792314450010') return message.channel.send(`Prefix in ${message.guild.name} is ${p}`)
    }
    if (!message.content.startsWith(p)) return;
    if (!message.guild) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(p.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length == 0) return;
    let command = client.commands.get(cmd)
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) command.run(client, message, args)
})

client.on('guildDelete', async (guild) => {
    prefixSchema.findOne({ Guild: guild.id }, async (err, data) => {
        if (err) throw err;
        if (data) {
            prefixSchema.findOneAndDelete({ Guild : guild.id }).then(console.log('deleted data.'))
        }
    })
})
//mongo db >>
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://saminss:saminss@octavianadv.o2zge.mongodb.net/test', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(console.log('M am conectat la baza'))
//mongo db <<
//music >> 
const distube = require("distube");
const player = new distube(client);

player
    .on("playSong", (message, queue, song) => {
    message.channel.send(`${song.name} a inceput sa cante`);
    const embed = new MessageEmbed()
        .setTitle('Now Playing')
        .setDescription(`${song.name}`)
        .setFooter(`Requested by ${message.author.tag}`)
        message.channel.send(embed);
    })
    .on("addList", (message, queue, playlist) => {
        message.channel.send(
            `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
        );
    })
    .on("empty", (message) => {
        message.channel.send("Channel is empty. Leaving the channel");
    })
    .on("error", (message, error) => {
        message.channel.send(`An error occured + ${error}`);
    })
    .on("finish", (message) => message.channel.send("No more song in queue"))
    .on("noRelated", message => message.channel.send("Can't find related video to play. Stop playing music."))
    .on("playList", (message, queue, playlist, song) => message.channel.send(
        `Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
    ))
    .on("searchCancel", (message) => message.channel.send(`Searching canceled`))
    .on("searchResult", (message, result) => {
        let i = 0;
        message.channel.send(
            `**Choose an option from below**\n${result
            .map(
                (song) =>
                    `**${++i}**.  ${song.name} = \`${
                        song.formattedDuration
                    }\``
            )
            .join(
                "\n"
            )}\n*Enter anything else or wait 60 seconds to cancel*`
        );
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
