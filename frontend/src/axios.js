// src/axios.js
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // send cookies
});

export default API;
