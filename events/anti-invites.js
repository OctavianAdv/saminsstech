const client = require("..");

client.on("messageCreate", async (message) => {
    if (!message.guild) return;

    function deleteMessage() {
        message.delete();
        message.channel.send("No advertisments in here!");
    }

    const links = ["discord.gg/", "discord.com/invite"];
    const linkdesters = ['discord.io/', 'youtube.com/'];
    linkdesters.forEach((link) => {
        if(message.content.includes(link)) return deleteMessage();
    }); 

    for (const link of links) {
        if(!message.content.includes(link)) return;

        const code = message.content.split(link)[1].split(" ")[0];
        const isGuildInvite = message.guild.invites.cache.has(code);

        if(!isGuildInvite) {
            try {
                const vanity = await message.guild.fetchVanityData();
                if (code !== vanity?.code) return deleteMessage();
            } catch (err) {
                deleteMessage();
            }
        }
    }
});