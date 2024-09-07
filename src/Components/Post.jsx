import { useEffect, useState } from "react";
import { getPost } from "../API/PostAPI";
import "../App.css";

const Post = () => {
  const [post, setPost] = useState([]);

  const getPostData = async () => {
    const res = await getPost();
    console.log(res.data);
    setPost(res.data);
  };

  useEffect(() => {
    getPostData();
  });

  return (
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
              <button>Delete</button>
            </li>
          );
        })}
      </ol>
    </section>
  );
};

export default Post;
