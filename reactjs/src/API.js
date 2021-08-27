// import https from 'https'
import axios from 'axios'

const API = axios.create({
  baseURL: process.env.API_URL || 'https://localhost:4000'
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
    // const userId = localStorage.getItem('userId')

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