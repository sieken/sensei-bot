const Discord = require('discord.js')
const axios = require("axios").default
const baseUrl = "https://en.wikipedia.org/w/api.php"

module.exports = () => {
    return axios.get(baseUrl, {
        params: {
            action: "query",
            format: "json",
            prop: "extracts|pageimages|info",
            generator: "random",
            grnlimit: "1",
            grnnamespace: "0",
            rnfilterredir: "nonredirects",
            formatversion: "2",
            exchars: "500",
            exlimit: "1",
            explaintext: "1",
            exsectionformat: "wiki",
            inprop: "url",
            pithumbsize: "500"
        }
    })
    .then(response => response.data.query.pages[0])
    .then(page => embedWiki(page))
    .catch(error => {
        console.error(error)
    })

}

embedWiki = page => {
    let embed = new Discord.MessageEmbed()
        .setColor('#fa98cc')
        .setTitle(`Wikipedia - ${page.title}`)
        .setDescription(page.extract)
        .setURL(page.fullurl)
    if (page.thumbnail) embed.setImage(page.thumbnail.source)
    embed.setThumbnail('https://safebooru.donmai.us/data/__w_arknights_and_1_more_drawn_by_pawamo_power__26d4b26107abdc75435582c02a0b4dde.gif')
    return embed
}
