const UserService = require('./../service/UserService')
const EmailUtil = require('./../util/EmailUtil')

module.exports = class UserController {

    static async findAll(_, res){

        try {
            res.json(await UserService.findAll())
        } catch (error) {
            console.log(`UserController: Erro ao buscar todos os usuários: ${error.message}`)
            res.status(error.status || 500).send(error.clientMessage || `Erro ao buscar usuários`)
        }

    }

    static async create(req, res) {
        try {
            await UserService.create(req.body)
            res.send("Usuário criado com sucesso!")
        } catch (error) {
            console.log(`UserController: Erro ao cadastrar usuário: ${error.message}`)
            res.status(error.status || 500).send(error.clientMessage || `Erro ao cadastrar usuário`)
        }

    }

    static async login(req, res) {
        try {
            let foundedUser = await UserService.findByEmailAndPassword(req.body)
            res.json(foundedUser)
        } catch (error) {
            console.log(`UserController: Erro ao login: ${error.message}`)
            res.status(error.status || 500).send(error.clientMessage || `Erro ao login`)
        }

    }

    static async forgotPassword(req, res) {
        try {
            let foundedUser = await UserService.findByEmail(req.body)
            EmailUtil.sendForgotPasswordEmail(foundedUser)
            res.send("Email de recuperação de senha enviado com sucesso")
        } catch (error) {
            console.log(`UserController: Erro ao recuperar a senha: ${error.message}`)
            res.status(error.status || 500).send(error.clientMessage || `Erro ao recuperar a senha`)
        }

    }

}