module.exports = {
    name : 'removerole',
    run : async(client, message, args) => {
        /**
         * @param {Message} message
         */


         if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(`${message.author.tag} nu ai acces.`);
        if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send('You do not have permission.')

        const pleacaroleu = message.mentions.members.first()
        if(!pleacaroleu) return message.channel.send('Nu ai specificat nici un membru.')

        const grad = message.mentions.roles.first()
        if(!grad) return message.channel.send('Nu ai specificat nici un grad.')

        await pleacaroleu.roles.remove(grad)
        message.channel.send(`${targer.user.username} i-a fost sters gradu.`)
    }
}
