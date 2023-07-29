import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../Stylesheet/CreatePost.css";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [files, setFiles] = useState("");
  const [description, setDescription] = useState("");
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const {_id} = useSelector((state)=> state.user)


  useEffect(() => {
    async function fetchData() {
      let res = await fetch(`https://lovely-spacesuit-fox.cyclic.app/posts/${id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      let data = await res.json();
      // console.log(data);

      setTitle(data.title);
      setSummary(data.summary);
      setDescription(data.description);
      setFiles(data.cover);
    }
    fetchData();
  }, []);

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

  async function updatePost(e) {
    e.preventDefault();
    // sending data to the server as Form-data instead of JSON
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    } else {
      data.set("file", files);
    }
    data.set("description", description);
    data.set("id", id);
    data.set("userId", _id)
    // console.log(files);

    const response = await fetch(`https://lovely-spacesuit-fox.cyclic.app/posts/${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: data,
    });
    if (response.ok) {
      alert("Updated Successfully");
      setRedirect(true);
    }else{
      alert("Updated Failed")
    }
  }
  if (redirect) {
    return <Navigate to={"/post/" + id} />;
    // navigate(`/posts/${id}`)
  }

  return (
    <div className="container">
      <form onSubmit={updatePost}>
        <input
          type="text"
          placeholder="Title"
          name="title"
          className="inputcontainer"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Summary"
          className="inputcontainer"
          name="summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
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
          Update
        </Button>
      </form>
    </div>
  );
}

export default EditPost;
