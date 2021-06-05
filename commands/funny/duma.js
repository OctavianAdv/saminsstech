const { Client, Message, MessageEmbed } = require("discord.js");
const fs = require('fs');
const { pushError } = require('../../utilities/msg.js');

//➝

module.exports = {
    name: "duma",
    description: "Afiseaza o gluma random.",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    
    run : async(client, message, args) => {
        switch (args[0]) {
            case 'add': {
                if (!message.member.hasPermission('ADMINISTRATOR'))
                    return pushError(message, 'Nu ai acces la aceasta comanda.');

                let duma_noua = args.splice(1, args.length).join(' ');
                if (!duma_noua) return pushError(message, 'Ai uitat să introduci duma.');

                fs.readFile('dume.json', function(err, data) {
                    if (err) console.error(err);

                    var json = JSON.parse(data);
                    if (json.includes(duma_noua))
                        return pushError(message, 'Această duma există deja.');

                    json.push(duma_noua);

                    fs.writeFile('dume.json', JSON.stringify(json), err => {
                        if (err) console.error(err);
                        message.channel.send('Duma adăugată cu succes! :sunglasses:');
                    });
                });

                break;
            }


            case 'pt': {
                let mentionedUser = message.guild.member(
                    message.mentions.users.first() || message.guild.members.get(args[0])
                );
                if (!mentionedUser) {
                    let duma = JSON.parse(fs.readFileSync('dume.json', 'utf8'));
                    message.channel.send(duma[Math.floor(Math.random() * duma.length)]);
                    return;
                }

                let duma = JSON.parse(fs.readFileSync('dume.json', 'utf8'));
                message.channel.send(
                    `${mentionedUser} ➝ ` + duma[Math.floor(Math.random() * duma.length)]
                );

                break;
            }

            default: {
                let duma = JSON.parse(fs.readFileSync('dume.json', 'utf8'));
                message.channel.send(duma[Math.floor(Math.random() * duma.length)]);
                break;
            }
        }
    }
}