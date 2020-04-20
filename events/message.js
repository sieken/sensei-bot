const wiki = require("../commands/wiki.js")
const doi = require("../commands/doi.js")

module.exports = (client, msg) => {

    // ignore bots
    if(msg.author.bot) return;
    // ignore prefixes that aren't sensei's
    if(msg.content.indexOf(process.env.PREFIX) !== 0) return;

    const args = msg.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    switch(cmd) {
        case 'w': wiki(args); break;
        case 'doi': doi(args); break;
    }
}