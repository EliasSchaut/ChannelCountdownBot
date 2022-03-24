const timer = require("../../handler/timer.js")
const config = require('../../../config/config.json')

const { get_text: gt } = require("../../lang/lang_man")
const s = "commands.bound."


module.exports = {
    name: 'bound',
    description: async function (msg) { return await gt(msg, s + "help") },
    aliases: ['link', 'b'],
    args: true,
    args_min_length: 1,
    usage: async function (msg) { return await gt(msg, s + "usage") },
    guildOnly: true,
    need_permission: ['ADMINISTRATOR'],
    async execute(msg, args) {
        args = args.join(" ").split("|")
        if (args.length !== 2) {
            return msg.client.output.reply(msg, await gt(msg, s + "wrong_args") + await this.usage(msg))
        }

        console.log(args[0])
        const channel = msg.guild.channels.cache.get(args[0].trim())
        if (channel === undefined) {
            return msg.client.output.reply(msg, await gt(msg, s + "can't_find_channel"))
        }

        if (!config.allow_connect) {
            channel.updateOverwrite(channel.guild.roles.everyone, {CONNECT: false})
        }
        if (!config.allow_stream) {
            channel.updateOverwrite(channel.guild.roles.everyone, {STREAM: false})
        }
        channel.updateOverwrite(config.bot_id, {CONNECT: true})
        await timer.timer(msg, channel, args[1].trim())
    },
};