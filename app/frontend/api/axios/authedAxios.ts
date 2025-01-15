import axios from 'axios';
import type { User } from 'types/users';

const authedAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

authedAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  const userString = localStorage.getItem('user');

  let email;

  if (userString) {
    const user = JSON.parse(userString) as User;
    email = user?.email;
  }

  if (token && email) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers.Email = email;
  }

  return config;
}, (error) => {
  // Manejar errores de request
  return Promise.reject(error);
});

export default authedAxios;
