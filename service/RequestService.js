const Mongoose = require("mongoose");
const Request = Mongoose.model("Request");

module.exports = class RequestService {
  static validade(request) {
    let errors = [];
    if (!request.name) errors.push("nome");
    if (!request.reason) errors.push("motivo");
    if (!request.duration) errors.push("tempo do empréstimo");
    if (!request.user) errors.push("autor do pedido");
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

  static async findAllNotAttended() {
    try {
      return await Request.find({}, '-attended')
        .populate("user")
        .exec();
    } catch (error) {
      throw {
        message: `RequestService: Erro ao buscar todos os pedidos: ${error.message}`
      };
    }
  }

  static async create(request) {
    try {
      let errors = RequestService.validade(request);
      if (errors)
        throw {
          message: `RequestService: Pedido inválido: ${errors}`,
          clientMessage: errors
        };
      return await Request.create(request);
    } catch (error) {
      throw {
        message: `RequestService: Erro ao cadastrar pedido: ${error.message}`,
        clientMessage: error.clientMessage || "Erro ao cadastrar cliente"
      };
    }
  }

  attendRequest(id) {
    try {
      return Request.findByIdAndUpdate(id, { $set: { attended: true } });
    } catch (error) {
      throw {
        message: `RequestService: Erro atualizar pedido como atendido: ${error.message}`
      };
    }
  }
};
