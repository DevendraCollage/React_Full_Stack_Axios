import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// Handle Get Method
export const getPost = () => {
  return api.get("/posts");
};

// Handle Delete Method
export const deletePost = (id) => {
  return api.delete(`/posts/${id}`);
};
