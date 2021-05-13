const config = require("../../config/config.json");

module.exports = {
    name: 'bound',
    description: "Bound Voice Channel to Timer",
    aliases: ['link', 'b'],
    args: false,
    guildOnly: true,
    dmOnly: false,
    restricted: true,
    execute(message, args) {
        let channel = message.guild.channels.cache.get(config.bday_channel);
        if (channel === undefined) {
            return message.reply("Can't find the given channel id");
        }

        let now = new Date();
        let bday = new Date(config.bday_time);

        let diff;
        let days;
        let hours;
        let mins;
        let out;

        console.log("start")
        message.reply("Bot started");
        function loop() {
            now = new Date();
            bday = new Date(config.bday_time);

            diff = (bday.getTime() - now.getTime()) / 1000;
            diff /= 60;
            diff = Math.round(diff);
            console.log("diff: " + diff)

            if (diff <= 0) {
                console.log("stop")
                channel.setName("Bday NOW");
                channel.updateOverwrite(channel.guild.roles.everyone, {CONNECT: true});
                clearInterval(timerID);
                return message.reply("Bday is now free");
            }

            days = Math.floor(diff / (60 * 24));
            hours = Math.floor((diff - (days * 60 * 24)) / 60);
            mins = diff % 60

            out = format(days, hours, mins)
            channel.setName(out);
            console.log("format: " + out);
        }
        const timerID = setInterval(loop, 5 * 60 * 1000);

        function format(days, hours, mins) {
            let out = "Bday ";
            if (days !== 0) {
                out += days + "d ";
            }
            if (hours !== 0) {
                out += hours + "h ";
            }
            if (mins !== 0) {
                out += mins + "min ";
            }

            return out;
        }
    },
};