const config = require('../config/config.json')

function timer(message, channel, time_format) {

    // -----------------------------------
    // Needed Variables
    // -----------------------------------
    const log = message.guild.channels.cache.get(config.log_channel);
    let now = new Date();
    let bday = new Date(time_format);
    if (isNaN(bday.getTime())) return message.reply("your time format is wrong!")

    let diff;
    let days;
    let hours;
    let mins;
    let out;
    const prefix_out = "Join in "
    // -----------------------------------


    // -----------------------------------
    // Rename Looper
    // -----------------------------------
    function loop() {
        now = new Date();
        bday = new Date(time_format)
        diff = (bday.getTime() - now.getTime()) / 1000;
        diff /= 60;
        diff = Math.round(diff);
        console.log("diff: " + diff)

        if (diff <= 0) {
            console.log("stop")
            channel.setName("JOIN NOW");
            channel.updateOverwrite(channel.guild.roles.everyone, {CONNECT: true});
            clearInterval(timerID);
            return message.reply("Voice channel is now free");
        }

        days = Math.floor(diff / (60 * 24));
        hours = Math.floor((diff - (days * 60 * 24)) / 60);
        mins = diff % 60

        out = format(days, hours, mins)
        channel.setName(prefix_out + out);
        if (config.log) {
            log.send("format: " + out);
        }
    }
    // -----------------------------------


    // -----------------------------------
    // Start Loop
    // -----------------------------------
    const timerID = setInterval(loop, 5 * 60 * 1000);
    console.log("start")
    message.reply("Bot started! End at: " + time_format);
    loop();
    // -----------------------------------


    // -----------------------------------
    // Helper
    // -----------------------------------
    function format(days, hours, mins) {
        let out = "";
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
    // -----------------------------------
}

module.exports = { timer }