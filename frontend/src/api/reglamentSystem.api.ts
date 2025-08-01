import axios from "axios";

const apiUrl = "http://localhost/api";
const api = axios.create({
  baseURL: apiUrl,
});

export default api;
