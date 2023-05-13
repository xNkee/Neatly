const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const Senhas = require('./models/senhas');

// Configuração do bodyParser para lidar com dados JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Habilita o CORS
app.use(cors());

// Cria um objeto para armazenar as senhas
let senhas = {
  geral: [],
  preferencial: []
};

// Rota para criar uma senha geral
app.post('/geral', async (req, res) => {
  try {
    const senha = await Senhas.create({
      senha: `GRL${(await Senhas.count({ where: { tipo: 'Geral' } }) + 1).toString().padStart(3, '0')}`,
      tipo: 'Geral',
      data_emissao: new Date(),
      status: 'Pendente',
    });

    res.status(201).json({ senha });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar senha' });
  }
});

// Rota para criar uma senha preferencial
app.post('/preferencial', async (req, res) => {
  try {
    const senha = await Senhas.create({
      senha: `PFL${(await Senhas.count({ where: { tipo: 'Preferencial' } }) + 1).toString().padStart(3, '0')}`,
      tipo: 'Preferencial',
      data_emissao: new Date(),
      status: 'Pendente',
    });

    res.status(201).json({ senha });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar senha' });
  }
});

// Inicia o servidor na porta 3000
app.listen(5000, () => {
  console.log('Servidor iniciado na porta 5000');
});