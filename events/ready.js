const client = require("../index");

client.on("ready", () => {
    console.log(`${client.user.username} ete gata sa faca spektacol`);
    
    const statusarray = [
        `welcome`,
        `to`,
        `TEAM HEXAR`
    ];
    
    let index = 0;
    setInterval(() => {
        if (index === statusarray.length) index = 0;
        const status = statusarray[index];
        client.user.setActivity(status);
        index++;
        }, 4500);
});