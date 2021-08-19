const axios = require("axios");
const errorLog = require("debug")("server:error");
const api = async (req, res, next) => {
  //set the base url
  const API = axios.create({
    baseURL: process.env.API_URL || "http://localhost:4000",
  });
  API.interceptors.response.use(
    (response) => (response ? response.data : {}),
    (error) => {
      errorLog(error);
    }
  );

  req.API = API;
  await API
  next();
};
module.exports = api;
