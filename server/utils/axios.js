// src/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.SERVER_URL,
});

export default instance;
