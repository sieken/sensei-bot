const wiki = require("../commands/wiki.js")
const doi = require("../commands/doi.js")

module.exports = (client, msg) => {
    // ignore bots
    if(msg.author.bot) return;
    // ignore prefixes that aren't sensei's
    if(msg.content.indexOf(process.env.PREFIX) !== 0) return;

    const channel = msg.channel
    const args = msg.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    const errorMsg = "Oops, something went wrong"

    // Let commands do their thing and then return
    // a promise that we can just post back to
    // the channel on resolve
    let responsePromise = null;
    switch(cmd) {
        case 'w': responsePromise = wiki(args); break;
        case 'doi': responsePromise = doi(args); break;
        default: responsePromise = noCmd(); break;
    }

    responsePromise.then(embed => channel.send(embed))
}

noCmd = () => new Promise().then(() => "No valid command received, what is a poor bot to do?")