const Mongoose = require('mongoose')
const User = Mongoose.model('User')

module.exports = class UserService {

    static async findAll() {
        try {
            return await User.find({})
        } catch (error) {
            throw new Error(`UserService: Erro ao buscar todos os usuários: ${error.message}`)
        }        
    }

    static async create(user) {
        try {
            return await User.create(user)
        } catch (error) {
            throw new Error(`UserService: Cadastrar usuário: ${error.message}`)
        }        
    }

}