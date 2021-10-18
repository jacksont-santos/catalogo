const database = require("./../database");
const Sequelize = require("sequelize");

const Filme = database.define("filmes", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  ano: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  genero: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imagem: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  produtora: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  duracao: {
    type: Sequelize.STRING,
    allowNull: false,
  },
 // descricao: Sequelize.STRING,
},
{
  freezeTableName: true,
  timestamps: false, 
  createdAt: false,
  updatedAt: false,
});

module.exports = Filme;