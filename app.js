const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const Senhas = require('./models/senhas');
const agora = new Date(Date.now() - (3 * 3600000));
const dataatual = new Date().toLocaleString('pt-BR', { 
  timeZone: 'America/Sao_Paulo',
  dateStyle: 'short',
  timeStyle: 'short'
});

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
app.post('/senha', async (req, res) => {
  try {
    const { tipo } = req.body;
    let prefixo, tipoSenha;
    
    if (tipo === 'geral') {
      prefixo = 'GRL';
      tipoSenha = 'Geral';
    } else if (tipo === 'preferencial') {
      prefixo = 'PFL';
      tipoSenha = 'Preferencial';
    }
    
    const senha = await Senhas.create({
      senha: `${prefixo}${(await Senhas.count({ where: { tipo: tipoSenha } }) + 1).toString().padStart(3, '0')}`,
      tipo: tipoSenha,
      data_emissao: agora,
      status: 'Pendente',
    });

    console.log(`A senha ${senha.senha} foi gerada com sucesso em ${dataatual}.`);

    res.status(201).json({ senha });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar senha' });
  }
});

// Teste de inicialização
app.listen(5000, () => {
  console.log(`${dataatual} - Servidor iniciado na porta 5000.`);
});