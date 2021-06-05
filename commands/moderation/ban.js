const config = require('../../config.json');
module.exports = {
    name: 'ban',

    run: async(client,message, args) => {
        if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(`${message.author.tag} nu ai acces.`);
        if(!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send('i do not have permission to ban members');
        if(!args[0]) return message.channel.send(`Syntax: ${config.prefix}`);
    
        const Membru = message.mentions.members.first()
        if(!Membru) return message.channel.send('Please specify a member to ban');

        await Membru.ban({ reason: args.slice(1).join(" ")})

        
        message.channel.send(`${Membru.user.tag} was baned from ther server!`)
    }
}