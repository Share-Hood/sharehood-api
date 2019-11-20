const LendingController = require('./../controller/LendingController')

module.exports = class RequestRoute {

    constructor(app) {
        
        app.route('/lendings')
            .post(LendingController.create)

        app.route('/lendings/:id')
            .get(LendingController.findByLenderOrBorrower)
        
        app.route('/lendings-lender/:id')
            .get(LendingController.findByLender)

        app.route('/lendings-borrower/:id')
            .get(LendingController.findByBorrower)
        
        app.route('/lending-finalize/:id')
            .get(LendingController.finalizeLending)

    }

}