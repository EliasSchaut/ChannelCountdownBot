# Voice Channel Countdown 
A bot for countdown a discord voice channel, until other members can connect to it.  

## Details
This bot can run the following commands (and more like `help`):
* ```bound```: Bound a voice channel to this bot. The bot will set the name of the channel to `Join in [time]`, 
  where `[time]` represents the time until a given js date format. Every five minutes the bot will rename the channel with the new remaining time.\
  If the remaining time is nearly zero, the bot will rename the channel to `JOIN NOW` and finish its process.\
* `create`: Same as `bound`, but the bot will create an own voice channel instead of bounding to an existent
* `stop`: Stop all running timers.

## Preparations
* You need [node.js](https://nodejs.org/en/) installed.
* You need a [Discord API Bot](https://discord.com/developers/applications) with its token.
* You need a [Discord server](https://support.discord.com/hc/en-us/articles/204849977-How-do-I-create-a-server) on which you can set permissions, so you can invite the bot and give it the following permissions:
    * Manage Channels
    * Send Messages

## Configuration
1. Download the code
2. Rename the configuration file *(/config/config-template.json)* from ```config-template.json``` to ```config.json```
3. Open the configuration file (now ```config.json```) and set:
    * your bots ``prefix``
    * your bots ``token``
    * your ``admin id's``: Enter a discord user id in quotation marks and separate several with a comma ```[ "<id>", "<id>", ..., "<id>"]```.\
      These are the only users who have the permission to execute the commands of this bot.
    * Set `bot_id` to the bot role id in the server (or to a role id, the bot holds).
    * **OPTIONAL**: Change `lang` from `en` to `de` for german instead of english language.  
    * **OPTIONAL**: Set a log channel: Set `log` to `true` and set the `channel_id` of the wanted channel.
4. Run ```npm install```.

## Run
Run ```index.js``` with ```npm start``` or ```node index.js```.




   
