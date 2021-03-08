module.exports = {
    name : 'clear',
    aliases: ['purge'],

    run : async(client, message, args) => {
        if(isNaN(args[0])) return message.channel.send('Numbers are only allowed')
        await message.channel.bulkDelete(parseInt(args[0]) + 1)
        .catch(err => console.log(err))
        message.channel.send('Deleted ' + args[0]  + " messages.")
    }
}