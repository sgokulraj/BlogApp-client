import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../Stylesheet/CreatePost.css";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";

function CreatePost() {
  const token = useSelector((state) => state.token);
  const { _id } = useSelector((state) => state.user);

  const [postDetails, setPostdetails] = useState({
    title: "",
    summary: "",
  });
  const [files, setFiles] = useState("");
  const [description, setDescription] = useState("");
  const [redirect, setRedirect] = useState(false);
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],

      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],

      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ["image", "link"],
      ["clean"],
    ],
  };

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setPostdetails((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  }
  if (redirect) {
    return <Navigate to="/posts" />;
  }
  return (
    <>
      <Navbar />
      <div className="container">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            // sending data to the server as Form-data instead of JSON
            const data = new FormData();
            data.set("author", _id);
            data.set("title", postDetails.title);
            data.set("summary", postDetails.summary);
            data.set("file", files[0]);
            data.set("description", description);
            console.log(data);
            const response = await fetch(
              "https://lovely-spacesuit-fox.cyclic.app/posts",
              {
                method: "POST",
                headers: {
                   Authorization: `Bearer ${token}` ,
                },
                body: data,
              }
            );
            if (response?.ok) {
              setRedirect(true);
              alert("Post created successfully");
            } else {
              alert("Post creation failed");
            }
          }}
        >
          <input
            type="text"
            placeholder="Title"
            className="inputcontainer"
            name="title"
            value={postDetails.title}
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            placeholder="Summary"
            className="inputcontainer"
            name="summary"
            value={postDetails.summary}
            onChange={handleChange}
          />
          <br />
          <input
            type="file"
            className="inputcontainer"
            onChange={(e) => setFiles(e.target.files)}
          />
          <br />
          <ReactQuill
            style={{ marginBottom: "20px" }}
            modules={modules}
            value={description}
            onChange={(newVal) => setDescription(newVal)}
          />
          <Button variant="dark" className="btnPost" type="submit">
            Create
          </Button>
        </form>
      </div>
    </>
  );
}

export default CreatePost;
