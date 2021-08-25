import https from 'https'
import axios from 'axios'

const API = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:4000',
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  }),
});

API.interceptors.response.use(
  (response) => (response ? response.data : {}),
  (error) => {
    console.log(error);
  },
);

API.interceptors.request.use(async (config) => {
  if (localStorage.getItem('token')) {
    const token = localStorage.getItem('token')
    console.log(token)
    return {
      ...config,
      headers: { common: { token } },
    };
  }
  else {
    return config
  }
});

export default API;