const LendingService = require('./../service/LendingService')

module.exports = class LendingController {

    static async findAll(_, res){

        try {
            res.json(await LendingService.findAll())
        } catch (error) {
            console.log(`LendingController: Erro ao buscar todos os empréstimos: ${error.message}`)
            res.status(error.status || 500).send(error.clientMessage || `Erro ao buscar empréstimos`)
        }

    }

    static async findByLenderOrBorrower(req, res){

        try {
            res.json(await LendingService.findByLenderOrBorrower(req.params.id, req.params.id))
        } catch (error) {
            console.log(`LendingController: Erro ao buscar os empréstimos por usuário: ${error.message}`)
            res.status(error.status || 500).send(error.clientMessage || `Erro ao buscar empréstimos`)
        }

    }

    static async findByLender(req, res){

        try {
            res.json(await LendingService.findByLender(req.params.id))
        } catch (error) {
            console.log(`LendingController: Erro ao buscar os empréstimos por emprestador: ${error.message}`)
            res.status(error.status || 500).send(error.clientMessage || `Erro ao buscar empréstimos`)
        }

    }

    static async findByBorrower(req, res){

        try {
            res.json(await LendingService.findByBorrower(req.params.id))
        } catch (error) {
            console.log(`LendingController: Erro ao buscar os empréstimos por emprestador: ${error.message}`)
            res.status(error.status || 500).send(error.clientMessage || `Erro ao buscar empréstimos`)
        }

    }

    static async finalizeLending(req, res){

        try {
            res.json(await LendingService.finalizeLending(req.params.id))
        } catch (error) {
            console.log(`LendingController: Erro ao finalizar empréstimo: ${error.message}`)
            res.status(error.status || 500).send(error.clientMessage || `Erro ao finalizar empréstimo`)
        }

    }

    static async create(req, res) {
        try {
            await LendingService.create(req.body)
            res.send("Empréstimo criado com sucesso!")
        } catch (error) {
            console.log(`LendingController: Erro ao cadastrar empréstimo: ${error.message}`)
            res.status(error.status || 500).send(error.clientMessage || `Erro ao cadastrar empréstimo`)
        }

    }

}