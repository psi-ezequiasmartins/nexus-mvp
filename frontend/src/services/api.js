/**
 * api.js
 */

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://nexus-api.markagp.com.br/api', //'http://localhost:3001/api', // ajuste para o backend real (com nginx ou domínio)
});

export default api;
