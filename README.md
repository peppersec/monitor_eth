## What is it? [![Docker Cloud Build Status](https://img.shields.io/docker/cloud/build/peppersec/monitor_eth.svg)](https://hub.docker.com/r/peppersec/monitor_eth/builds)
It's a bot that sends you notifications on Telegram if your eth balance goes below the specified threshold.

## How to use it

0. Copy `docker-compose.yml` to your dir, you don't need other files
1. Go to @BotFather and create a telegram BOT
2. Get a `TOKEN` for your BOT ( 123451298:BBA5x9ple0jJM7xyz....xyz)
3. Get groupId for your group to where the bot will post messages (just invite @getidsbot to your group): `CHAT_ID=-123456789`
4. Set `THRESHOLD=1` - in eth
5. Put those values into `docker-compose.yml` file
6. Run `docker-compose up -d`
