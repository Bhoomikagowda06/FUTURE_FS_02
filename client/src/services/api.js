import axios from "axios";

const API = axios.create({
  baseURL: "https://future-fs-02-9oj2.onrender.com/api",
});

export default API;