/* eslint-disable react/prop-types */
import { useState } from "react";
import "../index.css";
import { postData } from "../API/PostAPI";

const Form = ({ post, setPost }) => {
  const [AddData, setAddData] = useState({
    title: "",
    body: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setAddData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const addPostData = async () => {
    try {
      const res = await postData(AddData);
      console.log(res);
      setPost([...post, res]);
      setAddData({ title: "", body: "" });
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addPostData();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="title"></label>
        <input
          type="text"
          autoComplete="off"
          id="title"
          name="title"
          placeholder="Add Title"
          value={AddData.title}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="body"></label>
        <input
          type="text"
          autoComplete="off"
          id="body"
          name="body"
          placeholder="Add Post"
          value={AddData.body}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default Form;
