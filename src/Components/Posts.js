import Navbar from "./Navbar.js";
import PostsDisplay from "./PostsDisplay";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {setPosts} from "../Redux/index.js"

function Posts() {
  // const [posts, setPosts] = useState([]);
  const dispatch = useDispatch()
  const token = useSelector((state)=> state.token)
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    async function fetchData() {
      let response = await fetch("https://lovely-spacesuit-fox.cyclic.app/posts", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(response);
      let data = await response.json();
      // setPosts(data);
      dispatch(setPosts({ posts: data }));
      // console.log(posts);
    }
    fetchData();
  }, []);
  return (
    <>
      <Navbar />
      {posts.length > 0 &&
        posts.map((post) => {
          return <PostsDisplay {...post} key={post._id} />;
        })}
    </>
  );
}

export default Posts;
