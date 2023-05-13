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

// Rota para buscar todas as senhas
app.get('/senhas', async (req, res) => {
  try {
    const senhas = await Senhas.findAll({ order: [['id', 'DESC']] });

    res.status(200).json({ senhas });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar senhas' });
  }
});

// Rota para atualizar o status de uma senha
app.put('/senhas/:id/status', function(req, res) {
  const id = req.params.id;
  const { status, dataHoraStatus } = req.body;

  // Verifica se o id é válido
  if (isNaN(id)) {
    return res.status(400).json({ message: 'ID inválido.' });
  }

  // Busca a senha no banco de dados
  connection.query('SELECT * FROM Senhas WHERE id = ?', id, function(error, results, fields) {
    if (error) {
      return res.status(500).json({ message: 'Erro ao buscar a senha.', error: error });
    }

    // Verifica se a senha existe
    if (results.length === 0) {
      return res.status(404).json({ message: 'Senha não encontrada.' });
    }

    // Atualiza o status da senha
    connection.query('UPDATE Senhas SET status = ?, data_hora_status = ? WHERE id = ?', [status, dataHoraStatus, id], function(error, results, fields) {
      if (error) {
        return res.status(500).json({ message: 'Erro ao atualizar o status da senha.', error: error });
      }

      // Calcula o tempo de permanência
      const dataHoraEmissao = results[0].data_hora_emissao;
      const tempoPermanencia = (new Date(dataHoraStatus).getTime() - new Date(dataHoraEmissao).getTime()) / 1000; // Em segundos

      // Atualiza o tempo de permanência da senha
      connection.query('UPDATE Senhas SET permanencia = ? WHERE id = ?', [tempoPermanencia, id], function(error, results, fields) {
        if (error) {
          return res.status(500).json({ message: 'Erro ao atualizar o tempo de permanência da senha.', error: error });
        }

        // Retorna a senha atualizada
        connection.query('SELECT * FROM Senhas WHERE id = ?', id, function(error, results, fields) {
          if (error) {
            return res.status(500).json({ message: 'Erro ao buscar a senha atualizada.', error: error });
          }
          const senha = results[0];
          return res.status(200).json(senha);
        });
      });
    });
  });
});


// Inicia o servidor na porta 3000
app.listen(5000, () => {
  console.log('Servidor iniciado na porta 5000');
});