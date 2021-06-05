const {Message} = require('discord.js')

module.exports = {
    name : "unmute",
    /**
     * @param {Message} message
     */

    run : async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('You do not have permission to use this command')
        const Member = message.mentions.members.first() || message.guild.member.cache.get(args[0])

        if(!Member) return message.channel.send('Member not found')

        const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');

        await Member.roles.remove(role)

        message.channel.send(`${Member.displayName} is now unmuted`)
    }
}