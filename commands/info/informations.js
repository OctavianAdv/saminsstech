const { Discord, Message, MessageEmbed } = require("discord.js");

module.exports = {
    name: "informations",

    /**
     * @param { Client } client
     * @param {Message} message
     * @param {Strings[]} args
     */

    run : async(client, message, args) => {
    const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('title')
        .setURL('https://discord.js.org/')
        .setAuthor('name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
        .setDescription('description')
        .setThumbnail('https://i.imgur.com/wSTFkRM.png')
        .addFields(
            { name: 'title', value: 'ltykrl;ykjryrkyrkytrlykyrl;ykr;ylktrlyrkyrlykrtl;krl;kryklt;rkl;rk;l', inline: false },
        )
        .setImage('https://i.imgur.com/wSTFkRM.png')
        .setTimestamp('timestamp')
        .setFooter('footer', 'https://i.imgur.com/wSTFkRM.png');
    
        message.channel.send(embed);
    }
}