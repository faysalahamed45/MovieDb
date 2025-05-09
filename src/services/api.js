import axios from "axios";

const api = axios.create({
  baseURL: "https://movie-database-api-h01f.onrender.com/api",
   //baseURL: "http://localhost:5000/api",
  //https://movie-database-api-h01f.onrender.com
});

api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default api;
