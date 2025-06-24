const jwt = require('jsonwebtoken');

let atendimentos = [];

exports.login = (req, res) => {
  const { email, senha } = req.body;
  if (email === 'admin@nexus.com' && senha === '123456') {
    const token = jwt.sign({ email }, 'segredo123', { expiresIn: '1h' });
    return res.json({ token });
  }
  res.status(401).json({ erro: 'Credenciais inválidas' });
};

exports.listAtendimentos = (req, res) => {
  res.json(atendimentos);
};

exports.createAtendimento = (req, res) => {
  atendimentos.push(req.body);
  res.status(201).json(req.body);
};
