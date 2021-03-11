const {Client, Message, MessageEmbed } = require("discord.js");
const child = require("child_process");

module.exports = {
    name: "terminal",

    /**
     * @param { Client } client
     * @param { Message } message
     * @param { String[] } args
     */

    run: async(client,message,args) => {
        if (message.author.id !== "595233896770043905") return;

        const command = args.join(" ");
        if (!command)
            return message.reply("Specifica o comanda pentru a executa.");
        
        child.exec(command, (err, res) => {
            if (err) return console.log(err);
            message.channel.send(res.slice(0, 200), { code: "js"});
        });
    },
};