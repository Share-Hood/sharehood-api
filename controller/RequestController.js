const RequestService = require('./../service/RequestService')

module.exports = class UserController {

    static async findAll(_, res){

        try {
            res.json(await RequestService.findAllNotAttended())
        } catch (error) {
            console.log(`UserController: Erro ao buscar todos os pedidos: ${error.message}`)
            res.status(error.status || 500).send(error.clientMessage || `Erro ao buscar pedidos`)
        }

    }

    static async create(req, res) {
        try {
            await RequestService.create(req.body)
            res.send("Pedido criado com sucesso!")
        } catch (error) {
            console.log(`UserController: Erro ao cadastrar pedido: ${error.message}`)
            res.status(error.status || 500).send(error.clientMessage || `Erro ao cadastrar pedido`)
        }

    }

}