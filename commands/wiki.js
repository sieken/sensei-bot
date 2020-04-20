const axios = require("axios").default
const baseUrl = "https://en.wikipedia.org/w/api.php"

module.exports = args => {
    const query = args.join(" ")
    if (args.length < 1) return

    axios.get(baseUrl, {
        params: {
            action: "query",
            format: "json",
            list: "search",
            srsearch: `${args}`
        }
    })
    .then(response => response.data.query.search)
    .then(hits => axios.get(baseUrl, {
        params: {
                action: "query",
                format: "json",
                prop: "extracts",
                titles: hits[0],
                formatversion: "2",
                exlimit: "1",
                explaintext: "1",
                exsectionformat: "wiki"
        }
    }))
    .then(response => response.data.query.pages[0])
    .then(page => console.log(page.extract))
    .catch(error => console.error(error))
}