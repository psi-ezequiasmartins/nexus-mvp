const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./routes');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.listen(process.env.PORT || 3001, () => {
  console.log('Servidor rodando na porta ' + (process.env.PORT || 3001));
});
