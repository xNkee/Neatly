const express = require('express');
const { createSenha } = require('../controllers/senhaController');

const router = express.Router();

router.post('/', createSenha);

module.exports = router;