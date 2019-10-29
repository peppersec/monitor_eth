## What is it?
It's a bot that sends you notifications on Telegram if your eth balance goes below the specified threshold.

## How to use it

1. Go to @BotFather and create a telegram BOT
2. Get a `TOKEN` for your BOT ( 123451298:BBA5x9ple0jJM7xyz....xyz)
3. Get groupId for your group to where the bot will post messages (just invite @getidsbot to your group): `CHAT_ID=-123456789`
4. Set `THRESHOLD=1` - in eth
5. Put those values into `.env` file
6. Run `npm i && node index.js`
7. You can now setup cron
```
* * * * * cd /home/ubuntu/monitor_eth && node index.js >> /home/ubuntu/monitor_eth/success_log.txt 2>> /home/ubuntu/monitor_eth/errors.log
```
