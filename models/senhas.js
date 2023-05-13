const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('neatlydb', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

const Senhas = sequelize.define('Senha', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  data_emissao: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  permanencia: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
});

module.exports = Senhas;
