import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 10000, // Add timeout
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Axios Error:", error.message, error.response?.data);
    return Promise.reject(error);
  }
);

export default instance;
