import Button from "react-bootstrap/Button";
import "../Stylesheet/Auth.css";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../Redux/index.js";

function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  const validation = {
    email: {
      required: {
        value: true,
        message: "Enter Email",
      },
      pattern: {
        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        message: "Enter valid Email address",
      },
    },
    password: {
      required: {
        value: true,
        message: "Enter Password",
      },
    },
  };

  return (
    <>
      <nav className="navbar" style={{ backgroundColor: "aliceblue" }}>
        <div className="container-fluid">
          <span className="navbar-brand mb-0 px-2 h1 fs-3" style={{ fontWeight:700 }}>iBlog</span>
        </div>
      </nav>
      <div className="auth">
        <h3>Login</h3>
        <form
          className="formContain"
          onSubmit={handleSubmit(async (data, e) => {
            e.preventDefault();
            const response = await fetch("https://lovely-spacesuit-fox.cyclic.app/login", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({
                email: data.email,
                password: data.password,
              }),
            });

            // console.log(response);
            const dataSaved = await response.json();
            if (response.ok) {
              dispatch(
                setLogin({
                  user: dataSaved.user,
                  token: dataSaved.token,
                })
              );
              alert("Signin successfully!!!");
              navigate("/posts");
            } else {
              alert("login failed");
            }
          })}
        >
          <div className="input">
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="text"
              id="email"
              name="email"
              className="inputfield"
              placeholder="Enter valid email"
              {...register("email", validation.email)}
            />
            <br />
            <p className="error">{errors.email && errors.email.message}</p>
          </div>
          <div className="input">
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              id="password"
              name="password"
              className="inputfield"
              placeholder="Enter Password"
              {...register("password", validation.password)}
            />
            <br />
            <p className="error">
              {errors.password && errors.password.message}
            </p>
          </div>
          <div className="btnGroup">
            <Button type="submit" variant="dark" id="submitBtn">
              Submit
            </Button>
            <Button type="reset" variant="dark" id="clearBtn">
              Reset
            </Button>
          </div>
        </form>
        <p className="newUserLink">
          New to iBlog? <Link to="/register">Click here to Register</Link>
        </p>
      </div>
    </>
  );
}

export default Login;
