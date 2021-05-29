const timer = require("../../js/timer.js")
const config = require('../../config/config.json')
const text = require(`../../config/text_${config.lang}.json`).commands.create

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
    execute(message, args) {

        // create channel
        message.guild.channels.create('Join in', {
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
        }).then(channel => timer.timer(message, channel, args.join(" ")))
    }
}