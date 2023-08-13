import { Blockchain } from './Blockchain/blockchain'

const difficulty = Number(process.argv[2]) || 4
const blocks = Number(process.argv[3]) || 10

const blockchain = new Blockchain(difficulty)
let chain = blockchain.chain

for (let i = 0; i < blocks; i++) {
    const block = blockchain.createBlock(`Block data ${i}`)
    const minedBlock = blockchain.mineBlock(block)
    if (minedBlock) chain = blockchain.sendBlock(minedBlock.minedBlock)
}

console.log(`----- BLOCKCHAIN -----`)
console.log(chain)
