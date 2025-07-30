import axios from "axios";

const apiUrl = "/api";
const api = axios.create({
  baseURL: apiUrl,
});

export default api;
