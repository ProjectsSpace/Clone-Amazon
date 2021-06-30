import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // The API (cloud functions) url
});

export default instance;
