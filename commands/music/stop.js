const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
    name: "stop",

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (!message.member.voice.channel)
            return message.reply("Please join in a voice channel");

        client.player.stop()
    },
};