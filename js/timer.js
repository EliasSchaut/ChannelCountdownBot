const config = require('../config/config.json')
const text = require(`../config/text_${config.lang}.json`).timer
let current_timers = []


// -----------------------------------
// Start
// -----------------------------------
async function timer(message, channel, time_format) {

    // -----------------------------------
    // Needed Variables
    // -----------------------------------
    const log = await message.guild.channels.cache.get(config.log_channel);
    let now = new Date();
    let bday = new Date(time_format);
    if (isNaN(bday.getTime())) return message.reply("")

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
            current_timers.slice(current_timers.indexOf(timerID), 1)
            return message.reply(text.stopped);
        }

        days = Math.floor(diff / (60 * 24));
        hours = Math.floor((diff - (days * 60 * 24)) / 60);
        mins = diff % 60

        out = format(days, hours, mins)
        channel.setName(prefix_out + out);
        if (config.log) {
            log.send("Format: " + out);
        }
    }
    // -----------------------------------


    // -----------------------------------
    // Start Loop
    // -----------------------------------
    const timerID = setInterval(loop, 5 * 60 * 1000);
    current_timers.push(timerID)
    console.log("start")
    message.reply(text.started + time_format);
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
// -----------------------------------



// -----------------------------------
// Stop
// -----------------------------------
function stop_all() {
    for (const timerID of current_timers) {
        clearInterval(timerID)
    }
    console.log("Timers Stopped")
}
// -----------------------------------


module.exports = { timer, stop_all }