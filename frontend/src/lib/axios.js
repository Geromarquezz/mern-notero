import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:4003/api" : "/api";

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
