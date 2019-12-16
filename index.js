require('dotenv').config()
const { RPC_URL = 'https://cloudflare-eth.com',
        BLOCK_EXPLORER = 'etherscan.io',
        ADDRESS,
        THRESHOLD,
        INTERVAL = 300,
        TELEGRAM_NOTIFIER_BOT_TOKEN,
        TELEGRAM_NOTIFIER_CHAT_ID
} = process.env
const fetch = require('node-fetch')
const Web3 = require('web3')
const web3 = new Web3(RPC_URL)
const { toBN, toWei, fromWei } = require('web3-utils')

async function main() {
    try {
        let balance = await web3.eth.getBalance(ADDRESS)
        if( toBN(balance).lt(toBN(toWei(THRESHOLD))) ) {
            const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_NOTIFIER_BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: TELEGRAM_NOTIFIER_CHAT_ID,
                    text: `https://${BLOCK_EXPLORER}/address/${ADDRESS} balance is below ${THRESHOLD} ETH. \nit's ${fromWei(balance)}`
                }) // body data type must match 'Content-Type' header
            })
            console.log('resp', response)
        } else {
            console.log('everything is ok', `${ADDRESS} balance is ${fromWei(balance)}`)
        }
    } catch (e) {
        console.log(e)
    } finally {
        setTimeout(main, INTERVAL * 1000)
    }
}

async function healthcheck() {
    try {
        await fetch(`https://api.telegram.org/bot${TELEGRAM_NOTIFIER_BOT_TOKEN}/getMe`)
        await web3.eth.getBalance(ADDRESS)
    } catch (e) {
        console.log(e)
        process.exit(101)
    }
    process.exit(0)
}

if (process.argv.includes('healthcheck')) {
    healthcheck()
} else {
    main()
}