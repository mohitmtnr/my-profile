import "./NavBar.css";
import React, { useState, useEffect } from "react";

// import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

//top horizontal nav-bar for all pages
export default function NavBar(props) {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");

  //developer active class configuration
  let developerActiveClass =
    activeLink === "/developer/aboutme" ||
    activeLink === "/developer/experties" ||
    activeLink === "/developer/contactme" ||
    activeLink === "/developer/projects" ||
    activeLink === "/developer/currentstatus"
      ? "active"
      : "";

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
          <Link
            className={`navbar-brand text-${props.text}`}
            to="/"
            style={{ fontWeight: "800" }}
          >
            {props.title}
          </Link>

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
                <Link
                  className={`nav-link ${activeLink === "/" ? "active" : ""}`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item text-center">
                <Link
                  className={`nav-link ${developerActiveClass}`}
                  to="/developer/aboutme"
                >
                  {props.name}
                </Link>
              </li>
              <li className="nav-item text-center">
                <Link
                  className={`nav-link ${
                    activeLink === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About Us
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
            <div className="text-center">
              <button className="btn btn-success" type="submit">
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
