const UserController = require('./../controller/UserController')

module.exports = class UserRoute {

    constructor(app) {
        
        app.route('/users')
            .get(UserController.findAll)
            .post(UserController.create)

        app.route('/login')
            .post(UserController.login)

    }

}