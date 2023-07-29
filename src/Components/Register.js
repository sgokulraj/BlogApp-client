import Button from "react-bootstrap/Button";
import "../Stylesheet/Auth.css";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const password = useRef("");
  password.current = watch("password");

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  const validation = {
    username: {
      required: {
        value: true,
        message: "Enter Username",
      },
      minLength: {
        value: 5,
        message: "Your username should contain atleast 6 characters",
      },
    },

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
      minLength: {
        value: 6,
        message: "Your password should contain atleast 6 characters",
      },
    },
    confirm: {
      required: {
        value: true,
        message: "Confirm Password",
      },
      minLength: {
        value: 6,
        message: "Your password should contain atleast 6 characters",
      },
      validate: (value) => {
        if (value !== password.current) {
          return "The passwords doesn't match";
        }
      },
    },
  };

  return (
    <>
      <nav className="navbar" style={{ backgroundColor: "aliceblue" }}>
        <div className="container-fluid">
          <span
            className="navbar-brand mb-0 px-2 h1 fs-3"
            style={{ fontWeight: 700 }}
          >
            iBlog
          </span>
        </div>
      </nav>
      <div className="auth">
        <h3>Sign Up</h3>
        <form
          className="formContain"
          onSubmit={handleSubmit(async (data, e) => {
            e.preventDefault();
            const response = await fetch("https://lovely-spacesuit-fox.cyclic.app/register", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({
                username: data.username,
                email: data.email,
                password: data.password,
              }),
            });
            if (response.ok === false) {
              alert("registration failed");
            } else {
              alert("registration successful");
              navigate("/");
            }
          })}
        >
          <div className="input">
            <label htmlFor="username">Username</label>
            <br />
            <input
              type="text"
              id="username"
              name="username"
              className="inputfield"
              placeholder="Enter username"
              {...register("username", validation.username)}
            />
            <br />
            <p className="error">
              {errors.username && errors.username.message}
            </p>
          </div>

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

          <div className="input">
            <label htmlFor="confirm">Confirm Password</label>
            <br />
            <input
              type="password"
              id="confirm"
              name="confirm"
              className="inputfield"
              placeholder="Confirm Password"
              {...register("confirm", validation.confirm)}
            />
            <br />
            <p className="error">{errors.confirm && errors.confirm.message}</p>
            <br />
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
          Existing user? <Link to="/">Click here to login</Link>
        </p>
      </div>
    </>
  );
}

export default Register;
