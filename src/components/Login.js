import React, { useContext, useEffect, useState } from "react";
import lightDarkModeContext from "../context/LightDarkModeContext";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import alertContext from "../context/AlertContext";

const Login = ({ setProgress }) => {
  const mode = useContext(lightDarkModeContext);
  const { showAlert } = useContext(alertContext);
  const navigate = useNavigate();
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const googleLogin = useGoogleLogin({
    onSuccess: (response) => console.log(response),
  });

  //login
  function handleOnChange(e) {
    setLoginCredentials({
      ...loginCredentials,
      [e.target.name]: e.target.value,
    });
  }

  //submit form
  async function handleOnSubmit(e) {
    const { email, password } = loginCredentials;
    e.preventDefault();
    fetch("http://localhost:5000/profile/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((jsonResult) => {
        if (jsonResult.error) {
          localStorage.removeItem("authToken");
          showAlert("danger", jsonResult.error);
        } else {
          localStorage.setItem("authToken", jsonResult);
          showAlert("success", "Successfully logged in!");
          navigate("/");
        }
      })
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      navigate("/");
    }
    setProgress(40);
    setTimeout(() => {
      setProgress(100);
    }, 20);
  }, [setProgress]);
  return (
    <>
      <form
        className={`container my-5  py-5 rounded`}
        style={{ maxWidth: "600px" }}
        onSubmit={handleOnSubmit}
      >
        <div className="my-4 d-flex justify-content-center">
          <input
            type="email"
            className={`form-control w-75 input-${mode.background}`}
            name="email"
            placeholder="Email address"
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="my-4 d-flex justify-content-center align-items-center">
          <input
            id="login-password-input"
            type={showPassword ? "text" : "password"}
            className={`form-control w-75 input-${mode.background}`}
            name="password"
            placeholder="Password"
            autoComplete="current password"
            onChange={handleOnChange}
            required
          />
          <i
            id="show-password-eye"
            className={`fa-solid fa-${showPassword ? "eye" : "eye-slash"}`}
            style={{
              color: "#8b55f7",
              position: "relative",
              width: "0px",
              right: "30px",
              cursor: "pointer",
            }}
            onClick={togglePasswordVisibility}
          />
        </div>

        <div className="my-4 d-flex justify-content-center">
          <button type="submit" className="btn rounded m-purple w-75 py-2">
            Login
          </button>
        </div>
        <p className={`my-4 d-flex justify-content-center text-${mode.text}`}>
          Or
        </p>
        <div className="my-4 d-flex justify-content-center">
          <button
            className="btn rounded w-75 text-light py-3"
            style={{ backgroundColor: "black" }}
            onClick={googleLogin}
          >
            <i className="fa-brands fa-google mx-2" />
            <span> Continue with Google</span>
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
