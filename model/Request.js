const Mongoose = require('mongoose')

class Request extends Mongoose.Schema {

    constructor(){
        super({
            name: {
                type: String,
                required: true,
            },
            duration: {
                type: Number,
                required: true,
            },
            reason: {
                type: String,
                required: true,
            },
            user: {
                type: Mongoose.Types.ObjectId,
                required: true,
                ref: 'User'
            },
            attended: {
                type: Boolean,
                required: true,
                default: false
            }
        })

        Mongoose.model('Request', this)
    }

}

module.exports = Request