import axios from "axios";

const api = axios.create({
  baseURL: "https://payment.myhousepristontale.com.br/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
