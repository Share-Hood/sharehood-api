const Mongoose = require("mongoose");
const Lending = Mongoose.model("Lending");

module.exports = class LendingService {
  static validade(lending) {
    let errors = [];
    if (!lending.request) errors.push("pedido");
    if (!lending.lender) errors.push("emprestador");
    if (!lending.borrower) errors.push("tomador");
    if (errors.length == 1)
      return `O campo: ${errors.toString()} é obrigatório`;
    else if (errors.length > 1)
      return `Os campos: ${errors.toString()} são obrigatórios`;
    return "";
  }

  static async findAll() {
    try {
      return await Lending.find({});
    } catch (error) {
      throw {
        message: `LendingService: Erro ao buscar todos os empréstimos: ${error.message}`
      };
    }
  }

  static async findByLenderOrBorrower(lenderId, borrowerId) {
    try {
      return await Lending.find({
        $or: [{ lender: lenderId }, { borrower: borrowerId }]
      })
        .populate("request")
        .populate("lender")
        .populate("borrower")
        .exec();
    } catch (error) {
      throw {
        message: `LendingService: Erro ao buscar empréstimo por usuário: ${error.message}`
      };
    }
  }

  static async findByLender(lenderId) {
    try {
      return await Lending.find({ lender: lenderId })
        .populate("request")
        .populate("lender")
        .populate("borrower");
    } catch (error) {
      throw {
        message: `LendingService: Erro ao buscar empréstimo por emprestador: ${error.message}`
      };
    }
  }

  static async findByBorrower(borrowerId) {
    try {
      return await Lending.find({ borrower: borrowerId })
        .populate("request")
        .populate("lender")
        .populate("borrower");
    } catch (error) {
      throw {
        message: `LendingService: Erro ao buscar empréstimo por emprestante: ${error.message}`
      };
    }
  }

  static async finalizeLending(lendingId) {
    try {
      return await Lending.findByIdAndUpdate(lendingId, {
        finalizedDate: new Date()
      });
    } catch (error) {
      throw {
        message: `LendingService: Erro ao finalizar empréstimo: ${error.message}`
      };
    }
  }

  static async create(lending) {
    try {
      let errors = LendingService.validade(lending);
      if (errors)
        throw {
          message: `LendingService: Empréstimo inválido: ${errors}`,
          clientMessage: errors
        };
      return await Lending.create(lending);
    } catch (error) {
      throw {
        message: `LendingService: Erro ao cadastrar empréstimo: ${error.message}`,
        clientMessage: error.clientMessage || "Erro ao cadastrar"
      };
    }
  }
};
