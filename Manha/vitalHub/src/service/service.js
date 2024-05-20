import axios from 'axios';

// const portApi = '5074'
const portApi = '4466'
const url = 'http://192.168.21.109'

const apiUrlLocal = `${url}:${portApi}/api`

// Aplicando a criacao da conexão
const api = axios.create({
  baseURL : apiUrlLocal
});

export default api;