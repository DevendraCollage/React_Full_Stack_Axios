import { useEffect, useState } from "react";
import { deletePost, getPost } from "../API/PostAPI";
import "../App.css";
import Form from "./Form";

const Post = () => {
  const [post, setPost] = useState([]);

  const getPostData = async () => {
    const res = await getPost();
    console.log(res.data);
    setPost(res.data);
  };

  useEffect(() => {
    getPostData();
  }, []);

  const handleDeletePost = async (id) => {
    const res = await deletePost(id);
    try {
      if (res.status === 200) {
        const newUpdatedPost = post.filter((currPost) => {
          return currPost.id !== id;
        });
        setPost(newUpdatedPost);
      } else {
        console.log(`Failed to delete the post : ${res.status}`);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <section className="section-form">
        <Form post={post} setPost={setPost} />
      </section>
      <section className="section-post">
        <ol>
          {post.map((currElem) => {
            const { id, body, title } = currElem;
            return (
              <li key={id}>
                <p>{id}</p>
                <p>Title : {title}</p>
                <p>Body : {body}</p>
                <button>Edit</button>
                <button
                  className="btn-delete"
                  onClick={() => handleDeletePost(id)}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ol>
      </section>
    </>
  );
};

export default Post;
