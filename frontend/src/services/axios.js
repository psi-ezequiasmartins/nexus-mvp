/** 
 * axios.js
 */

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://nexus-api.markagp.com.br',
  headers: { 'Content-Type': 'application/json' }
});

export default api;