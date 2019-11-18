const Mongoose = require("mongoose");
const User = Mongoose.model("User");

module.exports = class UserService {
  static validade(user) {
    let errors = [];
    if (!user.name) errors.push("nome");
    if (!user.email) errors.push("email");
    if (!user.password) errors.push("senha");
    if (!user.cellphone) errors.push("celular");
    if (!user.cpf) errors.push("CPF");
    if (errors.length == 1)
      return `O campo: ${errors.toString()} é obrigatório`;
    else if (errors.length > 1)
      return `Os campos: ${errors.toString()} são obrigatórios`;
    return "";
  }

  static async findAll() {
    try {
      return await User.find({});
    } catch (error) {
      throw {
        message: `UserService: Erro ao buscar todos os usuários: ${error.message}`
      };
    }
  }

  static async findByEmailAndPassword(user) {
    try {
      let foundedUser = await User.findOne(user);
      if (foundedUser) return foundedUser;
      else {
        throw {
          message: `UserService: Usuário não encontrado`,
          clientMessage: `Usuário não encontrado`,
          status: 400
        };
      }
    } catch (error) {
      throw {
        message: `UserService: Erro ao buscar usuário por email e senha: ${error.message}`,
        clientMessage: error.clientMessage || `Erro ao buscar usuário por email e senha`,
        status: error.status || 500
      };
    }
  }

  static async findByEmail(user) {
    try {
      let foundedUser = await User.findOne(user);
      if (foundedUser) return foundedUser;
      else {
        throw {
          message: `UserService: Usuário não encontrado`,
          clientMessage: `Usuário não encontrado`,
          status: 404
        };
      }
    } catch (error) {
      throw {
        message: `UserService: Erro ao buscar usuário por email: ${error.message}`,
        clientMessage: error.clientMessage || `Erro ao buscar usuário por email`,
        status: error.status || 500
      };
    }
  }

  static async create(user) {
    try {
      let errors = UserService.validade(user);
      if (errors)
        throw {
          message: `UserService: Usuário inválido: ${errors}`,
          clientMessage: errors
        };
      return await User.create(user);
    } catch (error) {
      if (error.code == 11000) {
        throw {
          message: `UserService: Erro cadastrar usuário, os dados: email, CPF ou celular já existente: ${error.message}`,
          clientMessage: error.clientMessage || "Usuário já cadastrado",
          status: 400
        };
      } else {
        throw {
          message: `UserService: Erro ao cadastrar usuário: ${error.message}`,
          clientMessage: error.clientMessage || "Erro ao cadastrar cliente"
        };
      }
    }
  }
};
