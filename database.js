const Sequelize = require('sequelize');

// Configurações do banco de dados
const sequelize = new Sequelize('neatlydb', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

// Definição do modelo de senha
const Senha = sequelize.define('Senha', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  senha: {
    type: Sequelize.STRING(10),
    allowNull: false
  },
  tipo: {
    type: Sequelize.ENUM('Geral', 'Preferencial'),
    allowNull: false
  },
  data_emissao: {
    type: Sequelize.DATE,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('Chamada', 'Pendente'),
    allowNull: false
  },
  permanencia: {
    type: Sequelize.TIME,
    allowNull: true
  }
});

// Teste de conexão com o banco de dados
sequelize
  .authenticate()
  .then(() => console.log('Conexão bem sucedida.'))
  .catch((erro) => console.log(`Erro na conexão: ${erro}`));

// Função para inserir uma senha no banco de dados
function insert(senha) {
  Senha.create(senha);
}

// Função para buscar todas as senhas do banco de dados
async function getAllSenhas() {
  const senhas = await Senha.findAll();
  return senhas;
}

module.exports = {
  Senha,
  getAllSenhas,
  insert
};