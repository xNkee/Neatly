const Senha = require('../models/senhas');

const createSenha = async (req, res) => {
  try {
    const novaSenha = await Senha.create(req.body);
    return res.status(201).json(novaSenha);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createSenha
};
