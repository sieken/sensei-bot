const Discord = require('discord.js')
const axios = require("axios").default
const baseUrl = "https://en.wikipedia.org/w/api.php"

module.exports = args => {
    const query = args.join(" ")
    if (args.length < 1) return

    return axios.get(baseUrl, {
        params: {
            action: "query",
            format: "json",
            list: "search",
            srsearch: `${args}`
        }
    })
    .then(response => {
        const hits = response.data.query.search
        if (hits.length > 0) return handleSearchHits(hits)
        else return handleNoSearchHits()
    })
    .catch(error => console.error(error))
}

handleSearchHits = hits => {
    return axios.get(baseUrl, {
            params: {
                    action: "query",
                    format: "json",
                    prop: "extracts|categories|pageimages|info|imageinfo",
                    titles: hits[0].title,
                    formatversion: "2",
                    redirects: "1",
                    exchars: "500",
                    exlimit: "1",
                    explaintext: "1",
                    exsectionformat: "wiki",
                    clcategories: "Category:All disambiguation pages",
                    inprop: "url",
                    pithumbsize: "500"
            }
        })
    .then(response => response.data.query.pages[0])
    .then(page => {
        if (page.categories && page.categories.length > 0) {
            // TODO: Do something different for disambiguations?
        }
        console.log(page)
        return page ? embedWiki(page) : null
    })
    .catch(error => {
        console.error(error)
    })
}

handleNoSearchHits = () => {
    let embed = new Discord.MessageEmbed()
        .setTitle("No results")
        .setDescription("Sorry, I couldn't find that for you. <:sad:710485918196432928>")
    return embed
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