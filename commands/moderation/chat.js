const { chatBot } = require('reconlx')

module.exports = {
    name : 'chat',
    run : async(client,message,args) => {
        chatBOT(message, args.join(" "))
    }
}