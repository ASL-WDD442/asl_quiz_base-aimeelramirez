const axios = require("axios");
const https = require('https');
const errorLog = require("debug")("server:error");

const api = async (req, res, next) => {
  //set the base url
  const API = axios.create({
    baseURL: process.env.API_URL || "https://localhost:4000",
    httpsAgent: new https.Agent({
      rejectUnauthorized: false
    }),
  });
  API.interceptors.response.use(
    (response) => (response ? response.data : {}),
    (error) => {
      errorLog(error);
    }
  );
  API.interceptors.request.use(async (config) => {
    const { token } = req.session;
    if (!token) return config;

    return {
      ...config,
      headers: { common: { token } },
    };
  });

  req.API = API;
  await API
  next();
};
module.exports = api;
