import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Posts from "./Components/Posts";
import Login from "./Components/Login";
import Register from "./Components/Register";
import CreatePost from "./Components/CreatePost";
import SinglePost from "./Components/SinglePost";
import EditPost from "./Components/EditPost";
import { useSelector } from "react-redux";

function App() {
  const authGuard = Boolean(useSelector((state) => state.token));
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/posts"
          element={authGuard ? <Posts /> : <Navigate to="/" />}
        />

        <Route
          path="/create"
          element={authGuard ? <CreatePost /> : <Navigate to="/" />}
        />
        <Route
          path="/post/:id"
          element={authGuard ? <SinglePost /> : <Navigate to="/" />}
        />
        <Route
          path="/edit/:id"
          element={authGuard ? <EditPost /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
