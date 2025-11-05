import axios from 'axios';
const api = axios.create({ baseURL: '/api' });
// Add interceptors later
export default api;
