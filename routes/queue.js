const express = require('express');
const router = express.Router();
const Queue = require('../models/queue');


// Rota para receber solicitação de senhas gerais
router.post('/geral', async (req, res) => {
  try {
    const { name } = req.body;
    const ticket = await Queue.create({ name, priority: false });
    res.status(201).json({ message: 'Senha gerada', ticket });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Algo está errado' });
  }
});

// Rota para receber solicitação de senhas preferenciais
router.post('/preferencial', async (req, res) => {
  try {
    const { name } = req.body;
    const ticket = await Queue.create({ name, priority: true });
    res.status(201).json({ message: 'Senha gerada', ticket });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Algo está errado' });
  }
});

// Rota para obter a próxima senha na fila geral
router.get('/geral/next', (req, res) => {
  // TODO: implementar lógica para obter próxima senha na fila geral
  res.json({ ticketNumber: 1 }); // exemplo de resposta
});

// Rota para obter a próxima senha na fila preferencial
router.get('/preferencial/next', (req, res) => {
  // TODO: implementar lógica para obter próxima senha na fila preferencial
  res.json({ ticketNumber: 1 }); // exemplo de resposta
});

module.exports = router;
