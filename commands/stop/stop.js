const timer = require("../../js/timer.js")

module.exports = {
    name: 'stop',
    description: "Stop all timers",
    aliases: ['kill', 's'],
    args: false,
    guildOnly: true,
    dmOnly: false,
    restricted: true,
    execute(message, args) {
        timer.stop_all()
        message.channel.send("All timers stopped!!")
    }
}