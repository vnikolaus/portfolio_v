import { Block } from './typings/interfaces'
import { hash, validatedHash } from '../helpers/hash'

export class Blockchain {
    #chain: Block[] = []
    private prefixPow = '0'

    constructor(private readonly difficulty: number = 4) {
        this.#chain.push(this.createGenesisBlock())
    }

    get chain() {
        return this.#chain
    }

    private get lastBlock(): Block {
        return this.#chain.at(-1) as Block
    }

    private lastBlockHash(): string {
        return this.lastBlock.header.blockHash
    }

    private createGenesisBlock(): Block {
        const payload: Block['payload'] = {
            sequence: 0,
            timestamp: +new Date(),
            data: 'Genesis Block',
            previousHash: '',
        }

        const header: Block['header'] = {
            nonce: 0,
            blockHash: hash(JSON.stringify(payload)),
        }

        return { header, payload }
    }

    createBlock(data: unknown): Block['payload'] {
        const newBlock = {
            sequence: this.lastBlock.payload.sequence + 1,
            timestamp: +new Date(),
            data,
            previousHash: this.lastBlockHash(),
        }

        console.log(`Block #${newBlock.sequence} created: ${JSON.stringify(newBlock)}`)
        return newBlock
    }

    mineBlock(block: Block['payload']) {
        let nonce = 0
        const start = +new Date()

        const t = true
        while (t) {
            const blockHash = hash(JSON.stringify(block))
            const powHash = hash(blockHash + nonce)

            if (validatedHash({ hash: powHash, difficulty: this.difficulty, prefix: this.prefixPow })) {
                const ends = +new Date()
                const miningTime = (ends - start) / 1000

                console.log(`Block #${block.sequence} mined in ${miningTime}s.\nHash Pow: ${powHash} (${nonce} attempts)`)

                return {
                    minedBlock: {
                        payload: { ...block },
                        header: {
                            nonce,
                            blockHash,
                        },
                    },
                }
            }

            nonce++
        }
    }

    sendBlock(block: Block): Block[] {
        if (this.verifyBlock(block)) {
            this.#chain.push(block)
            console.log(`Block #${block.payload.sequence} added to the blockchain: ${JSON.stringify(block, null, 2)}`)
        }

        return this.#chain
    }

    verifyBlock(block: Block): boolean {
        if (block.payload.previousHash !== this.lastBlockHash()) {
            console.error(
                `Block #${block.payload.sequence} invalid !\n Previous hash is: ${this.lastBlockHash()} and not ${
                    block.payload.previousHash
                }`
            )

            return false
        }

        const validationHash = hash(hash(JSON.stringify(block.payload)) + block.header.nonce)
        if (!validatedHash({ hash: validationHash, difficulty: this.difficulty, prefix: this.prefixPow })) {
            console.error(`Block #${block.payload.sequence} invalid !\n Nonce is not verified}`)
            return false
        }

        return true
    }
}
