const timer = require("../../handler/timer.js")
const { lang } = require('../../../config/config.json')
const { get_text: gt } = require("../../lang/lang_man")
const s = "commands.stop."

module.exports = {
    name: 'stop',
    description: async function (msg) { return await gt(msg, s + "help") },
    aliases: ['kill', 's'],
    guildOnly: true,
    need_permission: ['ADMINISTRATOR'],
    async execute(msg, args) {
        const num_of_timers = timer.stop_all()
        msg.client.output.send(msg, await gt(msg, s + "stopped") + " (" + num_of_timers + ")")
    }
}