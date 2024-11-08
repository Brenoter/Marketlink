const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());


const users = [];


app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  

  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).send('Email já registrado');
  }

  users.push({ name, email, password: hashedPassword });
  res.status(201).send('Usuário registrado com sucesso');
});


app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(user => user.email === email);

  if (!user) {
    return res.status(401).send('Email ou senha incorretos');
  }

  const validPassword = bcrypt.compareSync(password, user.password);

  if (!validPassword) {
    return res.status(401).send('Email ou senha incorretos');
  }

  const token = jwt.sign({ email: user.email, name: user.name }, 'secrettoken', { expiresIn: '1h' });
  res.json({ token, userName: user.name });
});


app.get('/api/user', (req, res) => {
  res.json(users);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
