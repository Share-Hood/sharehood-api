const Mongoose = require('mongoose')

class User extends Mongoose.Schema {

    constructor(){
        super({
            name: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true,
                unique: true
            },
            password: {
                type: String,
                required: true,
            },
            cellphone: {
                type: String,
                required: true,
                unique: true
            },
            cpf: {
                type: String,
                required: true,
                unique: true
            }
        })

        Mongoose.model('User', this)
    }

}

module.exports = User