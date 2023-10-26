import "./NavBar.css";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import alertContext from "../context/AlertContext";

// import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

//top horizontal nav-bar for all pages
export default function NavBar(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("");
  const { showAlert } = useContext(alertContext);

  //logout
  function handleLogoutClick() {
    localStorage.removeItem("authToken");
    showAlert("success", "Successfully logged out!");
    navigate("/login");
  }
  // Update the active link when the location changes
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg navbar-${props.background} bg-${props.background} sticky-top mx-0`}
        style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.2)" }}
        onDoubleClick={props.ToggleFullScreen}
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler fs-6 px-3"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse m-2"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item text-center">
                <Link className={`nav-link active`} to="/aboutme">
                  {props.name}
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav me-right mb-2 mb-lg-0">
              <li className="nav-item text-center">
                <button
                  type="button"
                  className={`btn btn-${props.background} mx-2`}
                  id="nav-modes"
                  style={{
                    width: "3em",
                    display: "inline-flex",
                    color: "",
                  }}
                  onClick={props.handleToggleModeClick}
                >
                  <i
                    style={{ fontSize: "1.5em" }}
                    className={`fa-solid fa-${props.fontAwesomeClass}`}
                  ></i>
                </button>
              </li>
            </ul>
            {localStorage.getItem("authToken") ? (
              <div className="text-center">
                <button
                  className="btn btn-danger mx-1"
                  onClick={handleLogoutClick}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="text-center">
                <Link className="btn btn-success mx-2" to="login">
                  Login
                </Link>
                <Link className="btn d-purple" to="signup">
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
