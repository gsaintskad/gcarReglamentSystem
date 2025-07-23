import axios from "axios";

const apiUrl = "http://localhost:4000/api";
const api = axios.create({
  baseURL: apiUrl,
});

export default api;
