import { useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import "../Stylesheet/SinglePost.css";
// import { format } from "date-fns";
// import { formatISO9075 } from "date-fns";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../Redux/index.js";
import Navbar from "./Navbar"

function SinglePost() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const [redirect, setRedirect] = useState(false);
  const posts = useSelector((state) => state.posts);
  const { _id } = useSelector((state) => state.user);

  const { id } = useParams();
  const [postDetails, setPostdetails] = useState(null);
  useEffect(() => {
    async function fetchData() {
      let response = await fetch(`https://lovely-spacesuit-fox.cyclic.app/posts/${id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      let data = await response.json();
      // setPostdetails(data);
      //   console.log(postDetails);
      dispatch(setPosts({ posts: data }));
    }
    fetchData();
  }, []);

  async function deletePost(id) {
    // console.log(id);
    if (window.confirm("Are you sure to delete the post?")) {
      let res = await fetch(`https://lovely-spacesuit-fox.cyclic.app/posts/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      let data = res.json();
      // console.log(data);
      if (res.ok) {
        alert("Post Deleted");
        setRedirect(true);
      }
    }
  }

  if (redirect) {
    return <Navigate to="/posts" />;
  }
  return (
    <>
      <Navbar />
      <div className="singlepost">
        <h1 className="title">{posts?.title}</h1>
        {/* <time>{formatISO9075(new Date(parseInt(postDetails?.createdAt)))}</time> */}
        <p className="singlepostauthor">
          Created by @{posts?.author?.username}{" "}
        </p>
        {_id === posts?.author?._id && (
          <div className="editContainer">
            <Link to={`/edit/${posts?._id}`}>
              <AiFillEdit className="editpostBtn" />
            </Link>
            <Link>
              <AiFillDelete
                className="editpostBtn"
                onClick={() => deletePost(posts?._id)}
              />
            </Link>
          </div>
        )}
        <div className="imgContain">
          <img src={`https://lovely-spacesuit-fox.cyclic.app/${posts?.cover}`} alt="" />
        </div>
        <div className="desc">
          <div dangerouslySetInnerHTML={{ __html: posts?.description }} />
        </div>
      </div>
    </>
  );
}

export default SinglePost;
