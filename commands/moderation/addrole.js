module.exports = {
    name: 'addrole',
    run : async(client, message, args) => {
        /**
         * @param {Message} message
         */
        
        if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send('You do not have permission.')
        if(!args[0]) return message.channel.send('```Syntax : prefix!addrole @User @Role```')

        const primesterole = message.mentions.members.first()
        if(!primesterole) return message.channel.send('No member specified')
        const grad = message.mentions.roles.first()
        if(!grad) return message.channel.send('No role specified')

        await primesterole.roles.add(grad)
        message.channel.send(`${primesterole.user.username} a obtinut un rol`)
    }
}