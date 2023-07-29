import "../Stylesheet/Navbar.css";
import { Link } from "react-router-dom";
import { setLogout } from "../Redux/index";
import { useSelector, useDispatch } from "react-redux";
import { FaUserAlt } from "react-icons/fa";
import {BiSolidHelpCircle, BiSolidMessage} from "react-icons/bi"
import {MdNotificationsActive} from "react-icons/md"
import bootstrap from "bootstrap";

function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userName = user === null ? "" : `${user.username}`


  return (
    <nav
      className="navbar navbar-expand-lg py-2 px-3 titleNav"
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/posts">
          <h2>iBlog</h2>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarTogglerDemo02">
          
          <div className="d-flex ms-auto navLinkPosition">
            <ul className="navbar-nav mb-2 mb-lg-0">
                           
              <li className="nav-item">
                <Link className="nav-link active" to="/create">
                  Create Post
                </Link>
              </li>
              <li className="nav-item">
                <span className="nav-link dropdown dropstart">
                  <FaUserAlt
                    style={{ fontSize: "25px"}}
                    className="dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  ></FaUserAlt>
                  <ul className="dropdown-menu">
                    <li className="dropdown-item">Welcome {userName}</li>
                    <li
                      className="dropdown-item"
                      onClick={() => {
                        dispatch(setLogout());
                        alert("Logout successful");
                      }}
                    >
                      Logout
                    </li>
                  </ul>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
