import pkg from 'js-sha256';
const { sha256 } = pkg;

export default class {
    #chain = null
    #currentTransactions = null 

    constructor() {
        this.#init()

        this.createNewBlock(1, 100)
    }

    #init() {
        this.#chain = []
        this.#currentTransactions = []
    }

    createNewBlock(proof, prevHash = null) {
        const block = {
            'index': this.#chain.length + 1,
            'timestamp': new Date().getTime() / 1000,
            'transactions': this.#currentTransactions,
            'proof': proof,
            'prevHash': prevHash ? prevHash : this.getHash(this.lastBlock) 
        }

        this.#currentTransactions = []
        this.#chain.push(block)
        return block
    }

    createNewTransaction(sender, recipient, amount) {
        this.#currentTransactions.push({sender, recipient, amount})
        return this.#currentTransactions.length - 1 
    }

    proofOfWork(lastProof) {
        let proof = 0

        while (!this.validateProof(lastProof, proof)) {
            proof = proof + 1
        }

        return proof
    }

    validateProof(lastProof, proof) {
        const guess = sha256(JSON.stringify(Number(lastProof) * Number(proof)))
        return guess.endsWith('0000')
    }

    static getHash(block) {
        return sha256(JSON.stringify(block))
    }

    get lastBlock() {
        return this.#chain[this.#chain.length - 1]
    }
    get chain() {
        return [...this.#chain]
    }
}