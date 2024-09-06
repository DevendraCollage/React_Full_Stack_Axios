import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// Handle Get Method
export const getPost = () => {
  return api.get("/posts");
};
