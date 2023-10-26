import React, { useEffect, useState, useContext } from "react";
import profileImage from "./developer-image.jpeg";
import "./Developer.css";
import { Link, Outlet, useLocation } from "react-router-dom";
import lightDarkModeContext from "../context/LightDarkModeContext";

export default function Developer(props) {
  //use context
  const mode = useContext(lightDarkModeContext);

  //destructuring the properties
  const { setProgress } = props;

  //use of location from react router to change the active class as per url path
  const currentLocation = useLocation();
  const [activePath, setActivePath] = useState("");
  //use effect
  useEffect(() => {
    setProgress(40);
    setTimeout(() => {
      setProgress(100);
    }, 20);
    setActivePath(currentLocation.pathname);
  }, [setProgress, currentLocation]);

  return (
    <>
      <div id="left-side-menu">
        <button
          className={`left-side-menu-toggle-button p-2`}
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasWithBothOptions"
          aria-controls="offcanvasWithBothOptions"
          style={{
            backgroundColor: "transparent",
            display: "block",
            border: "transparent",
            position: "fixed",
            bottom: "50%",
            zIndex: "1",
          }}
        >
          <i
            className="fa-solid fa-caret-right fa-2xl"
            style={
              mode.background === "dark" ? { color: "#fff" } : { color: "#000" }
            }
          ></i>
        </button>

        <div
          className={`offcanvas offcanvas-start bg-${mode.background}`}
          data-bs-scroll="true"
          tabIndex="-1"
          id="offcanvasWithBothOptions"
          aria-labelledby="offcanvasWithBothOptionsLabel"
          style={{ width: "15em" }}
        >
          <div className="offcanvas-header text-light">
            <div
              className="image-container"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "5em",
                height: "5em",
                border: "solid 1px transparent",
                borderRadius: "50%",
                overflow: "hidden",
              }}
            >
              <img
                src={profileImage}
                height="64"
                width="64"
                alt="Profile"
                loading="lazy"
                style={{
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
              />
            </div>
            <h6 className={`text-${mode.text} px-3`}>
              Mohit <small className="text-secondary">developer</small>
            </h6>
            <button
              id="offcanvas-close-button"
              type="button"
              className={`btn bg-danger btn-sm d-flex`}
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              style={{
                position: "relative",
                marginTop: "-74px",
                marginRight: "-12px",
              }}
            >
              <i className="fa-solid fa-xmark align-self-center" />
            </button>
          </div>
          <div
            id="left-side-menu-offcanvas-body"
            className="offcanvas-body d-flex justify-content-start p-0"
          >
            <ul className="my-side-nav p-0 w-100">
              <h6 className="text-secondary  mx-2">Navigation</h6>
              <div className="my-4">
                <li
                  className="nav-item w-75 my-1"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                >
                  <Link
                    to="/aboutme"
                    className={`nav-link text-${mode.text} ${
                      activePath === "/aboutme" ? "active-link" : ""
                    } rounded-end`}
                    aria-current="page"
                  >
                    <i
                      className="fa-regular fa-address-card"
                      style={{ width: "20px" }}
                    />
                    <span className="mx-2">About Me</span>
                  </Link>
                </li>
                <li
                  className="nav-item w-75 my-1"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                >
                  <Link
                    to="/experties"
                    className={`nav-link text-${mode.text}  ${
                      activePath === "/experties" ? "active-link" : ""
                    } rounded-end`}
                    aria-current="page"
                  >
                    <i className="fa-solid fa-lock" style={{ width: "20px" }} />
                    <span className="mx-2">Experties</span>
                  </Link>
                </li>
                <li
                  className="nav-item w-75 my-1"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                >
                  <Link
                    to="/projects"
                    className={`nav-link text-${mode.text}  ${
                      activePath === "/projects" ? "active-link" : ""
                    } rounded-end`}
                    aria-current="page"
                  >
                    <i
                      className="fa-solid fa-user-shield"
                      style={{ width: "20px" }}
                    />
                    <span className="mx-2">Projects</span>
                  </Link>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}
