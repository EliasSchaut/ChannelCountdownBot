const timer = require("../../js/timer.js")
const config = require('../../config/config.json')
const text = require(`../../config/text_${config.lang}.json`).commands.create
const bound = require("./bound.js")

module.exports = {
    name: 'create',
    description: text.help,
    aliases: ['start', 'c'],
    args: true,
    args_min_length: 1,
    usage: text.usage,
    guildOnly: true,
    dmOnly: false,
    restricted: true,
    async execute(message, args) {

        args = args.join(" ").split("|")
        
        if (args.length < 1 || args.length > 2) {
            return message.reply(text.wrong_args + text.usage)
        }
        // create channel
        const channel = await message.guild.channels.create("...", {
            type: 'voice',
            permissionOverwrites: [
                {
                    id: message.guild.roles.everyone,
                    allow: ['VIEW_CHANNEL']
                },
                {
                    id: config.bot_id,
                    allow: ['CONNECT', 'VIEW_CHANNEL']
                },
            ],
        })

        if (!config.allow_connect) {
            await channel.updateOverwrite(channel.guild.roles.everyone, {CONNECT: false})
        }
        if (!config.allow_stream) {
            await channel.updateOverwrite(channel.guild.roles.everyone, {STREAM: false})
        }
        if (args.length == 2) {
            await timer.customTimer(message, channel, args[0], args[1])
        }
        if (args.length == 1) {
            await timer.timer(message, channel, args[0])
        }
    }
}

