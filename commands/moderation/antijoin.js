const {Client, Message, MessageEmbed, MessageManager } = require("discord.js");
const { antijoin } = require("../../Collection");
module.exports = {
    name: "antijoin",
    /**
     * @param { Client } client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client,message,args) => {
        if (!message.member.permissions.has("ADMINISTRATOR")) return;

        const query = args[0].toLowerCase();
        if (!query) return message.reply("Please specify a query.");

        // nuintravalet aka antijoin on
        // antijoin off nu intra valetu din pacate.
        const getCollection = antijoin.get(message.guild.id);
        if (query === "on") {
            if (getCollection)
                return message.reply("Antijoin este deja activat.");
            
            antijoin.set(message.guild.id, []);
            message.reply("Turned on antijoin");
        } else if(query === "off")  {
            if (!getCollection)
                return message.reply("Anti join deja oprit");

            antijoin.delete(message.guild.id);
            message.reply("Oprit antijoin system.");
        } else if (query === "list") {
            if (!getCollection) return message.reply("Antijoin disable.");
            message.reply(
                `Kicked Members: ${getCollection.map((value) => {
                    return `${value.tag}  (${value.id})`;
                })}`
            );
        }
    },
};