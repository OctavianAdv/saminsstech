const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'announce',
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('Nu ai acces la aceasta comanda.');

        let mention;

        if(!args.length) return message.channel.send('> Usage: o!announce <#channel> <message> <-ping ?>');

        const channel = message.mentions.channels.first();
        if(!channel) return message.reply('Specifica un canal');

        if(!args[1]) return message.reply('Specifica un mesaj care sa fie anuntat.');

        //mentionam

        if(args.some((val) => val.toLowerCase() === '-ping')) {
            for (let i = 0; i < args.length; i++) {
                if(args[i].toLowerCase() === '-ping') args.splice(i, 1);
            }

            mention = true;
        } else mention = false;

        if(mention === true) channel.send('@here');

        channel.send(
            new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true}))
            .setDescription(args.slice(1).join(" "))
            .setTimestamp()
            .setColor('RANDOM')
        )


        
    }
}