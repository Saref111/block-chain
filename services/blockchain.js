export default new class {
    #chain = null
    #currentTransactions = null 

    constructor() {
        this.#init()
        console.log('init blockchain');
    }

    #init() {
        this.#chain = []
        this.#currentTransactions = []
    }

    createNewBlock() {

    }

    createNewTransaction(sender, recipient, amount) {
        this.#currentTransactions.push({sender, recipient, amount})
        return this.#currentTransactions.length - 1 
    }

    static getHash(block) {

    }

    get lastBlock() {
        return this.#chain[this.#chain.length - 1]
    }
}