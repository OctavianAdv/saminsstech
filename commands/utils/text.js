const figlet = require('figlet');

module.exports = {
    name: "text-art",

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client,message,args) => {
        figlet.text(
            args.join(" "),
            {
                font: "Star Wars",
            },
            async(err, data) => {
                message.channel.send(`\`\`\`${data}\`\`\``);
            }
        );
    },
};