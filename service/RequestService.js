const Mongoose = require("mongoose");
const Request = Mongoose.model("Request");

module.exports = class RequestService {
  static validade(lending) {
    let errors = [];
    if (!lending.name) errors.push("nome");
    if (!lending.reason) errors.push("motivo");
    if (!lending.duration) errors.push("tempo do empréstimo");
    if (!lending.user) errors.push("autor do pedido");
    if (errors.length == 1)
      return `O campo: ${errors.toString()} é obrigatório`;
    else if (errors.length > 1)
      return `Os campos: ${errors.toString()} são obrigatórios`;
    return "";
  }

  static async findAll() {
    try {
      return await Request.find({})
        .populate("user")
        .exec();
    } catch (error) {
      throw {
        message: `RequestService: Erro ao buscar todos os pedidos: ${error.message}`
      };
    }
  }

  static async create(lending) {
    try {
      let errors = RequestService.validade(lending);
      if (errors)
        throw {
          message: `RequestService: Pedido inválido: ${errors}`,
          clientMessage: errors
        };
      return await Request.create(lending);
    } catch (error) {
      throw {
        message: `RequestService: Erro ao cadastrar pedido: ${error.message}`,
        clientMessage: error.clientMessage || "Erro ao cadastrar cliente"
      };
    }
  }
};
