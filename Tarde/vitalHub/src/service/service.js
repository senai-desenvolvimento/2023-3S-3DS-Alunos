import axios from 'axios';

const portApi = '5074'
const ip = '172.16.20.235'
// const apiUrlLocal = `http://${ip}:${portApi}/api`
const apiUrlLocal = `http://localhost:${portApi}/api`

// Aplicando a criacao da conexão
const api = axios.create({
  baseURL : apiUrlLocal
});

export default api;