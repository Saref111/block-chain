import express from 'express'
import * as uuid from 'uuid'
import Blockchain from './services/blockchain.js'

const app = express()

const nodeId = process.env['HASH_ID'] || uuid.v4().replace(/\-/g, '')

if (!process.env['HASH_ID']) {
    console.log(nodeId, 'Save this code to use your account in future!');
}

const blockchain = new Blockchain()

app.use(express.json());
app.use(express.urlencoded({extended: false}))


app.get('/mine', (req, res) => {
    const lastBlock = blockchain.lastBlock
    const lastProof = lastBlock.proof
    const proof = blockchain.proofOfWork(lastProof)

    blockchain.createNewTransaction('0', nodeId, 1)

    const prevHash = Blockchain.getHash(lastBlock)
    const block = blockchain.createNewBlock(proof, prevHash)

    const response = {
        message: 'New block forged!',
        index: block.index,
        transactions: block.transactions,
        proof: block.proof,
        prevHash: block.prevHash
    }
    return res.status(200).send(response)
}) 

app.post('/transactions/new', (req, res) => {
    const {sender, recipient, amount} = req.body

    if (!sender || !recipient || !amount) {
        return res.status(400).json({message: 'Missing values!'})
    }

    const index = blockchain.createNewTransaction(sender, recipient, amount)
    return res.status(201).json({message: 'Create new transaction to Block ' + index, index})
})

app.get('/chain', (req, res) => {
    const resp = {
        chain: blockchain.chain,
        length: blockchain.chain.length,
    }

    return res.status(200).json(resp)
})


app.listen(5000, () => {
    console.log('Listen on 5000');
})