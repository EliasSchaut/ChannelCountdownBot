const timer = require("../../js/timer.js")
const { lang } = require('../../config/config.json')
const text = require(`../../config/text_${lang}.json`).commands.stop

module.exports = {
    name: 'stop',
    description: "Stop all timers",
    aliases: ['kill', 's'],
    args: false,
    guildOnly: true,
    dmOnly: false,
    restricted: true,
    execute(message, args) {
        const num_of_timers = timer.stop_all()
        message.channel.send(text.stopped + " (" + num_of_timers + ")")
    }
}