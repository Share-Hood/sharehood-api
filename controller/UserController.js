const UserService = require('./../service/UserService')

module.exports = class UserController {

    static async findAll(_, res){

        try {
            res.json(await UserService.findAll())
        } catch (error) {
            console.log(`UserController: Erro ao buscar todos os usuários: ${error.message}`)
            res.status(500).send()
        }

    }

    static async create(req, res) {

        try {
            await UserService.create(req.body)
            res.json("Usuário criado com sucesso!")
        } catch (error) {
            console.log(`UserController: Erro ao cadastrar usuário: ${error.message}`)
            res.status(500).send()
        }

    }

}