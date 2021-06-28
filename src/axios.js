import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5001/clone-61d6f/us-central1/api", // The API (cloud functions) url
});

export default instance;
