// Import axios
import axios from "axios";

// Access the environment variable
// In Vite, variables are available on `import.meta.env`
const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
  console.error("VITE_API_URL is not defined. Please check your .env files.");
}

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: apiUrl,
});

export default api;
