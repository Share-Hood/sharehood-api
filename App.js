require('./util/LoggerUtil')
const express = require('express')
const Loader = require('./Loader')
const DBConnectionFactory = require('./factory/DBConnectionFactory')

const init = async () => {
    
    let app = express()

    try {
        await DBConnectionFactory.connect()
        global.logger.success(`Banco conectado com sucesso!`);
    } catch (error) {
        global.logger.error(`Erro ao conectar com o banco de dados: ${error.message}`);
        process.exit(-1)
    }
    
    app.get('/', (_, res) => {
        res.send("API Sharehood")
    })

    Loader.loadAll(app);

    app.listen(3000, () => {
        global.logger.success(`API rodando na porta 3000`);
    })    
} 

init()