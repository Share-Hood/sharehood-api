const Mongoose = require('mongoose')

class User extends Mongoose.Schema {

    constructor(){
        super({
            name: String,
            email: String,
            password: String
        })

        Mongoose.model('User', this)
    }

}

module.exports = User