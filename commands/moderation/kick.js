module.exports = {
    name: 'kick',

    run: async(client,message, args) => {
        if(!message.guild.me.hasPermission('KICK_MEMBERS')) return message.channel.send('i do not have permission to kick members');
        if(!args[0]) return message.channel.send('```Syntax : prefix!kick @User```')
    
        const Membru = message.mentions.members.first()
        if(!Membru) return message.channel.send('Please specify a member to kick');

        await Membru.kick({ reason: args.slice(1).join(" ")})
        message.channel.send(`${Membru.user.tag} was kicked from ther server!`)
    }
}