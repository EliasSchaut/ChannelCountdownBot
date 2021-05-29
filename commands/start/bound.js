const timer = require("../../js/timer.js")
const config = require('../../config/config.json')

module.exports = {
    name: 'bound',
    description: "Bound existent voice channel to timer",
    aliases: ['link', 'b'],
    args: true,
    args_min_length: 1,
    usage: "[channel_id]|[time_format]",
    guildOnly: true,
    dmOnly: false,
    restricted: true,
    execute(message, args) {
        args = args.join(" ").split("|")
        if (args.length !== 2) {
            return message.reply("Wrong args. You should use this format: [channel_id]|[time_format]")
        }

        const channel = message.guild.channels.cache.get(args[0].trim())
        if (channel === undefined) {
            return message.reply("Can't find the given channel id")
        }

        channel.updateOverwrite(channel.guild.roles.everyone, {CONNECT: false})
        channel.updateOverwrite(config.bot_id, {CONNECT: true})
        timer.timer(message, channel, args[1].trim())
    },
};