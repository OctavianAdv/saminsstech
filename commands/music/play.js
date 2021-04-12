const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = { 
    name: "play",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async (client, message, args) => {
        if (!message.member.voice.channel)
            return message.reply("Intra pe un canal de voice.");

        const query = args.join(" ");
        if (!query) return message.reply("Te rog introdu un nume al unei melodii");
        
        await client.player.play(message, query);
    },
};