const mongoose = require('mongoose')

module.exports = class DBConnectionFactory {

    static async connect() {
    
        try {
            await mongoose.connect("mongodb://sharehood:sharehood123@ds339348.mlab.com:39348/sharehood", { useNewUrlParser: true, useUnifiedTopology: true })
        } catch (error) {
            throw new Error(`DBConnectionFactory: Erro ao conectar no banco de dados: ${error.message}`)
        }

    }

}