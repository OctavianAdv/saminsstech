const { Client, Message, MessageEmbed} = require("discord.js");

module.exports = {
    name: "stop",

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) =>  {
        if (!message.member.voice.channel)
            return message.reply("Te rog intra pe un canal.");

        client.player.stop(message);
    },
};