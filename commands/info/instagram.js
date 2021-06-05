const { abbreviateNumber } = require('../../utilities/msg.js');
const { MessageEmbed, Message } = require('discord.js');
const { stripIndents } = require('common-tags');
const fetch = require('node-fetch');

module.exports = {
    name: "instagram",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args  
     */

    run: async(client, message, args) => {
    try{
        const name = args.join(' ');
        
        if (!name) {
            return message
                .reply(
                    'Ai uitat sa introduci numele contului pe care vrei sa l cauti.'
                )
                .then(m => m.delete(5000));
            }

            const url = 'https://instagram.com/${name}/?__a=1';

            let res;

            try {
                res = await fetch(url).then(url => url.json());
            } catch (e) {
                return message
                    .reply('Acest username este invalid.')
                    .then(m => m.delete(5000));
            }

            const account = res.graphql.user;

            const embed = new RichEmbed()
                .setColor('#0071ff')
                .setTitle(account.full_name)
                .setURL(`https://instagram.com/${name}`)
                .setThumbnail(account.profile_pic_url_hd)
                .addField(
                    'Profile information',
                    stripIndents`Username: **${account.username}**
                    Full name: **${account.full_name}**
                    Posts: **${abbreviateNumber(
                        account.edge_owner_to_timeline_media.count
                    )} **
                    Followers: **${abbreviateNumber(account.edge_followed_by.count)}**
                    Following: **${abbreviateNumber(account.edge_follow.count)}**
                    Private account: **${account.is_private ? 'Yes' : 'No'}**`,
                    true
                )
                .addField(
                    'Biography',
                    `**${account.biography.length == 0 ? 'none' : account.biography}**`
                );

            message.channel.send(embed);
        } catch (e) {
            console.log(e);
        }
    }
}