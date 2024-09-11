/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "../index.css";
import { postData, updateData } from "../API/PostAPI";

const Form = ({ post, setPost, updateDataApi, setUpdateDataApi }) => {
  const [AddData, setAddData] = useState({
    title: "",
    body: "",
  });

  let isEmpty = Object.keys(updateDataApi).length === 0;

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

  const updatePostData = async () => {
    try {
      const res = await updateData(updateDataApi.id, AddData);
      console.log(res);

      if (res.status === 200) {
        setPost((prev) => {
          return prev.map((curElem) => {
            return curElem.id === res.data.id ? res.data : curElem;
          });
        });

        setAddData({ title: "", body: "" });
        setUpdateDataApi({});
      }
    } catch ({ error }) {
      console.log(error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;

    if (action === "Add") {
      addPostData();
    } else if (action === "Edit") {
      updatePostData();
    }
  };

  // const handleButtonClear = () => {
  //   setAddData({
  //     title: "",
  //     body: "",
  //   });
  // };

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
      <button type="submit" value={isEmpty ? "Add" : "Edit"}>
        {isEmpty ? "Add" : "Edit"}
      </button>
      {/* <button
        style={{ marginTop: "10px" }}
        type="submit"
        onClick={handleButtonClear}
      >
        Clear
      </button> */}
    </form>
  );
};

export default Form;
