const RequestController = require('./../controller/RequestController')

module.exports = class RequestRoute {

    constructor(app) {
        
        app.route('/requests')
            .get(RequestController.findAll)
            .post(RequestController.create)

    }

}