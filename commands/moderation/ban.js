module.exports = {
    name: 'ban',

    run: async(client,message, args) => {
        if(!message.guild.me.hasPermission('ban_MEMBERS')) return message.channel.send('i do not have permission to ban members');
    
        const Membru = message.mentions.members.first()
        if(!Membru) return message.channel.send('Please specify a member to ban');

        await Membru.ban({ reason: args.slice(1).join(" ")})
        message.channel.send(`${Membru.user.tag} was baned from ther server!`)
    }
}