const timer = require("../../js/timer.js")
const config = require('../../config/config.json')

module.exports = {
    name: 'create',
    description: "create voice channel and bound to timer",
    aliases: ['start', 'c'],
    args: true,
    args_min_length: 1,
    usage: "[time_format]",
    guildOnly: true,
    dmOnly: false,
    restricted: true,
    async execute(message, args) {

        // create channel
        const channel = await message.guild.channels.create('Join in', {
            type: 'voice',
            permissionOverwrites: [
                {
                    id: message.guild.roles.everyone,
                    deny: ['CONNECT', 'STREAM'],
                    allow: ['VIEW_CHANNEL']
                },
                {
                    id: config.bot_id,
                    allow: ['CONNECT', 'VIEW_CHANNEL']
                },
            ],
        })

        timer.timer(message, channel, args.join(" "))
    }
}