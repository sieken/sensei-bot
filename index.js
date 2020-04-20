require("dotenv").config()
const fs = require("fs")
const Discord = require("discord.js")
const client = new Discord.Client()

// yoinked from some tutorial
fs.readdir("./events/", (err, files) => {
    files.forEach(file => {
        const eventHandler = require(`./events/${file}`)
        const eventName = file.split(".")[0]
        client.on(eventName, (...args) => eventHandler(client, ...args))
    })
})

client.login(process.env.SENSEI_BOT_TOKEN)