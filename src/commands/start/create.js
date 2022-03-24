const timer = require("../../handler/timer.js")
const config = require('../../../config/config.json')
const { get_text: gt } = require("../../lang/lang_man")
const s = "commands.create."

module.exports = {
    name: 'create',
    description: async function (msg) { return await gt(msg, s + "help") },
    aliases: ['start', 'c'],
    args: true,
    args_min_length: 1,
    usage: async function (msg) { return await gt(msg, s + "usage") },
    guildOnly: true,
    need_permission: ['ADMINISTRATOR'],
    async execute(msg, args) {
        args = args.join(" ").split("|")
        
        if (args.length < 1 || args.length > 2) {
            return msg.client.output.reply(msg, await gt(msg, s + "wrong_args") + await this.usage(msg))
        }
        // create channel
        const channel = await msg.guild.channels.create("...", {
            type: 'voice',
            permissionOverwrites: [
                {
                    id: msg.guild.roles.everyone,
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
        if (args.length === 2) {
            await timer.customTimer(msg, channel, args[0], args[1])
        }
        if (args.length === 1) {
            await timer.timer(msg, channel, args[0])
        }
    }
}

