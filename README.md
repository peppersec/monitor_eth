## What is it?
It's telegram bot that sends you a notification if your eth balance went below threshold

## How to use

1. Go to @BotFather and make telegram BOT
2. Get `TOKEN` for your BOT ( 123451298:BBA5x9ple0jJM7xyz....xyz)
3. Get groupId for your group where the bot will post a message ( just invite @getidsbot to your group): `CHAT_ID=-123456789`
4. set `THRESHOLD=1` - in eth
5. put those values into `.env` file
6. run `npm i && node index.js`
7. you can setup cron
```
* * * * * cd /home/ubuntu/monitor_eth && node index.js >> /home/ubuntu/monitor_eth/success_log.txt 2>> /home/ubuntu/monitor_eth/errors.log
```