const Mongoose = require('mongoose')

class Lending extends Mongoose.Schema {

    constructor(){
        super({
            createdDate: {
                type: Date,
                required: true,
                default: new Date()
            },
            finalizedDate: {
                type: Date,
                default: null
            },
            request: {
                type: Mongoose.Types.ObjectId,
                required: true,
                ref: 'Request'
            },
            lender: {
                type: Mongoose.Types.ObjectId,
                required: true,
                ref: 'User'
            },
            borrower: {
                type: Mongoose.Types.ObjectId,
                required: true,
                ref: 'User'
            },
        })

        Mongoose.model('Lending', this)
    }

}

module.exports = Lending