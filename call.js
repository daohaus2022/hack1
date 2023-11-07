const { ethers } = require("ethers")
const abi = require('./abi.json')
const utils = require("../../eth/utils")

const provider = new ethers.providers.JsonRpcProvider('https://mainnet.era.zksync.io') 

//const contract_address = '0x3DA215F43d31056992BEEfFE347FE2AdecaFAbAD'
const contract_address = '0x6294A1083023B13AeEee1eFa42F060Ef8C987E96' //101
//const contract_address = '0x1BA0ae4B601396E336e65e9b35e9dDb2D51fbDDB' //102
//const contract_address = '0x7f7c08240B824680A7E8C7bcaC9bdbDfEf7a13e4' //okx
//const contract_address = '0x3EEDff62c8b08E909f158486457290F5C4882864' //oky

async function main() {
  console.log(`provider: ${provider.connection.url}\n`)

  let sec = require('prompt-sync')()('hi -> ', {echo:'*'})
  
  let arr = sec.split('')
  if (arr.length != 16) return

  let key

  let alias = process.argv[2]
  if (alias == undefined) {
    console.log('alias is required.')
    return
  }

  key = utils.get_key_by_alias(arr, alias)
  if (key == undefined) {
    console.log('bad alias')
    return
  }

  let wallet = new ethers.Wallet(key, provider)
  console.log("\n" + wallet.address)

  const contractWithSigner = new ethers.Contract(contract_address, abi, wallet)

  //let gasPrice = await provider.getGasPrice();
  //console.log('gas price:', gasPrice/1e9 + ' Gwei')
  
  let tx = await contractWithSigner.setGreeting('GM era!')
  console.log(`set greeting in transaction: ${tx.hash}`)  
  
  let s = await contractWithSigner.greet()
  console.log(s)
}

main()