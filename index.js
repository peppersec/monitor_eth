const fetch = require('node-fetch')
const Web3 = require('web3')
const web3 = new Web3('https://cloudflare-eth.com')
const { toBN, toWei, fromWei } = require('web3-utils')
require('dotenv').config()
const { ADDRESS, THRESHOLD, INTERVAL, TELEGRAM_NOTIFIER_BOT_TOKEN, TELEGRAM_NOTIFIER_CHAT_ID } = process.env

async function main() {
    try {
        let balance = await web3.eth.getBalance(ADDRESS)
        balance = toBN(balance)
        if( balance.lt(toBN(toWei(THRESHOLD))) ) {
            const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_NOTIFIER_BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: TELEGRAM_NOTIFIER_CHAT_ID,
                    text: `https://etherscan.io/address/${ADDRESS} balance is below ${THRESHOLD} ETH. \nit's ${fromWei(balance.toString(10))}`
                }) // body data type must match 'Content-Type' header
            })
            console.log('resp', response)
        } else {
            console.log('everythig is ok', `${ADDRESS} balance is ${fromWei(balance.toString(10))}`)
        }
    } catch (e) {
        console.log(e)
    } finally {
        setTimeout(main, INTERVAL * 1000)
    }
}

if (process.argv.includes('healthcheck')) {
    fetch(`https://api.telegram.org/bot${TELEGRAM_NOTIFIER_BOT_TOKEN}/getMe`)
        .then(() => process.exit(0))
        .catch(() => process.exit(101)) 
} else {
    main()
}