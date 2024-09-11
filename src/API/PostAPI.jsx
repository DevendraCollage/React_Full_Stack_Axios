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

export const postData = async (data) => {
  try {
    const response = await api.post("/posts", data);
    return response.data; // Return the posted data
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

// Put Method
export const updateData = (id, post) => {
  return api.put(`/posts/${id}`, post);
};
