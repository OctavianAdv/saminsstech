const { Client, Message, MessageEmbed } = require("discord.js");
const axios = require("axios");

module.exports = {
    name: "docs",
    /**
     * @param { Client } client
     * @param {Message} message
     * @param {Strings[]} args
     */

    run: async(client, message, args) => {
        const query = args.join("");
        if(!query) return message.reply("Specifica un query.");
        const url = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
            query
        )}`;

        axios.get(url).then(({ data }) => {
            if(data) {
                message.channel.send({embed: data});
            }
        });
    },
};