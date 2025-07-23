import axios from "axios";

const apiUrl = "http://localhost:4000/api/myTaxi";
const api = axios.create({
  baseURL: apiUrl,
});

export default api;
