/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "../index.css";
import { postData } from "../API/PostAPI";

const Form = ({ post, setPost, updateDataApi, setUpdateDataApi }) => {
  const [AddData, setAddData] = useState({
    title: "",
    body: "",
  });

  // get the updated data and add into input field
  useEffect(() => {
    updateDataApi &&
      setAddData({
        title: updateDataApi.title || "",
        body: updateDataApi.body || "",
      });
  }, [updateDataApi]);

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

  const handleButtonClear = () => {
    setAddData({
      title: "",
      body: "",
    });
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
      <button
        style={{ marginTop: "10px" }}
        type="submit"
        onClick={handleButtonClear}
      >
        Clear
      </button>
    </form>
  );
};

export default Form;
