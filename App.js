require("./util/LoggerUtil");
const express = require("express");
var bodyParser = require("body-parser");
const Loader = require("./Loader");
const DBConnectionFactory = require("./factory/DBConnectionFactory");
const PORT = process.env.PORT || 3000;

const init = async () => {
  let app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  try {
    await DBConnectionFactory.connect();
    global.logger.success(`Banco conectado com sucesso!`);
  } catch (error) {
    global.logger.error(
      `Erro ao conectar com o banco de dados: ${error.message}`
    );
    process.exit(-1);
  }

  app.get("/", (_, res) => {
    res.send("API Sharehood");
  });

  Loader.loadAll(app);

  app.listen(PORT, () => {
    global.logger.success(`API rodando na porta 3000`);
  });
};

init();
