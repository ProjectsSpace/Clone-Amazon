import axios from "axios";

const instance = axios.create({
  baseURL: "https://amazon-clone-be.herokuapp.com/api", // The API (cloud functions) url
});

export default instance;
