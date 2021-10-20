import express from 'express'
import uuid from 'uuid'
import Blockchain from './services/blockchain.js'

const app = express()

const nodeId = uuid().replaceAll('-', '')

const blockchain = new Blockchain()

app.use(express.urlencoded({extended: false}))

app.get('/mine', (req, res) => {
    return res.send('Mine!')
})
app.post('/transactions/new', (req, res) => {
    return res.send('Create new transaction!')
})
app.get('/chain', (req, res) => {
    const resp = {
        chain: blockchain.chain,
        length: blockchain.chain.length,
    }

    return res.statusCode(200).json(resp)
})


app.listen(5000)