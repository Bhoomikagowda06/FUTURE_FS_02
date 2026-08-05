import axios from "axios";

const API = axios.create({
  baseURL: "https://future-fs-02-server.onrender.com/api",
});

export default API;