const timer = require("../../js/timer.js")
const config = require('../../config/config.json')
const text = require(`../../config/text_${config.lang}.json`).commands.bound

module.exports = {
    name: 'bound',
    description: text.help,
    aliases: ['link', 'b'],
    args: true,
    args_min_length: 1,
    usage: text.usage,
    guildOnly: true,
    dmOnly: false,
    restricted: true,
    execute(message, args) {
        args = args.join(" ").split("|")
        if (args.length !== 2) {
            return message.reply(text.wrong_args + text.usage)
        }

        const channel = message.guild.channels.cache.get(args[0].trim())
        if (channel === undefined) {
            return message.reply(text["can't_find_channel"])
        }

        channel.updateOverwrite(channel.guild.roles.everyone, {CONNECT: false})
        channel.updateOverwrite(config.bot_id, {CONNECT: true})
        timer.timer(message, channel, args[1].trim())
    },
};