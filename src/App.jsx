import { useEffect } from "react";
import { getPost } from "./API/PostAPI";

const App = () => {
  const getPostData = async () => {
    const res = await getPost();
    console.log(res.data);
  };

  useEffect(() => {
    getPostData();
  });

  return <div></div>;
};

export default App;
