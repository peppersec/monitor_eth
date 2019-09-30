const Web3 = require('web3')
require('dotenv').config()
const web3 = new Web3('https://cloudflare-eth.com')
const { toBN, toWei, fromWei } = require('web3-utils')
const fetch = require('node-fetch')
const { TOKEN, ADDRESS, THRESHOLD, CHAT_ID }  = process.env

async function main() {
    let balance = await web3.eth.getBalance(ADDRESS)
    balance = toBN(balance)
    if( balance.lt(toBN(toWei(THRESHOLD))) ) {
        const response = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: `https://etherscan.io/address/${ADDRESS} balance is below ${THRESHOLD} ETH. \nit's ${fromWei(balance.toString(10))}`
            }) // body data type must match "Content-Type" header
        });
    }
    console.log('resp', response)
}

main()