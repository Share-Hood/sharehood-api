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
            }
        })

        Mongoose.model('User', this)
    }

}

module.exports = User