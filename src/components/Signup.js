import React, { useContext, useEffect, useState } from "react";
import lightDarkModeContext from "../context/LightDarkModeContext";
import { json, useNavigate } from "react-router-dom";
import alertContext from "../context/AlertContext";

const Signup = ({ setProgress }) => {
  const { showAlert } = useContext(alertContext);
  const mode = useContext(lightDarkModeContext);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  function googleSignup(e) {
    e.preventDefault();
    console.log("clicked");
  }

  //submit form
  async function handleOnSubmit(e) {
    e.preventDefault();
    const { name, email, mobile, password } = credentials;
    if (credentials.confirmPassword !== credentials.password) {
      showAlert("warning", "Password did not match!");
      return 0;
    }

    // fetch("http://localhost:5000/profile/auth/createuser", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ name, email, mobile, password }),
    // })
    //   .then((res) => res.json())
    //   .then((jsonResult) => {
    //     if (jsonResult.error) {
    //       localStorage.removeItem("authToken");
    //       showAlert("danger", jsonResult.error[0].msg);
    //     } else {
    //       localStorage.setItem("authToken", jsonResult);
    //       showAlert("success", "Successfully logged in!");
    //       navigate("/");
    //     }
    //   })
    //   .catch((error) => console.log(error));
  }

  function handleOnChange(e) {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      navigate("/");
    }
    //progress
    setProgress(40);
    setTimeout(() => {
      setProgress(100);
    }, 20);
  }, [setProgress]);

  return (
    <form
      className={`container my-5  py-5 rounded`}
      style={{ maxWidth: "600px" }}
      onSubmit={handleOnSubmit}
    >
      <div className="my-4 d-flex justify-content-center">
        <input
          type="text"
          className={`form-control w-75 input-${mode.background}`}
          name="name"
          placeholder="Name"
          onChange={handleOnChange}
          required
        />
      </div>
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
      <div className="my-4 d-flex justify-content-center">
        <input
          type="number"
          title="Enter mobile number with country code as +91"
          className={`form-control w-75 input-${mode.background}`}
          name="mobile"
          maxLength={10}
          placeholder="Mobile no."
          onChange={handleOnChange}
          required
        />
      </div>
      <div className="my-4 d-flex justify-content-center">
        <input
          type="password"
          className={`form-control w-75 input-${mode.background}`}
          name="password"
          placeholder="Password"
          autoComplete="new password"
          onChange={handleOnChange}
          required
        />
      </div>
      <div className="my-4 d-flex justify-content-center">
        <input
          type="text"
          className={`form-control w-75 input-${mode.background}`}
          name="confirmPassword"
          placeholder="Confirm Password"
          autoComplete="new password"
          onChange={handleOnChange}
          required
        />
      </div>

      <div className="my-4 d-flex justify-content-center">
        <button id="signup-button" className="btn m-purple w-75">
          Signup
        </button>
      </div>
      <p className={`my-4 d-flex justify-content-center text-${mode.text}`}>
        Or
      </p>

      <div className="my-4 d-flex justify-content-center">
        <button
          className="btn rounded w-75 text-light py-3"
          style={{ backgroundColor: "black" }}
          onClick={googleSignup}
        >
          <i className="fa-brands fa-google mx-2" />
          <span> Continue with Google</span>
        </button>
      </div>
    </form>
  );
};

export default Signup;
