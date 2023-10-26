// import logo from "./logo.svg";
import React, { useState, lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import AlertState from "./states/AlertState";
import lightDarkModeContext from "./context/LightDarkModeContext";
import ToggleFullScreen from "./components/ToggleFullScreen";
import "./App.css";
import ContentLoading from "./loaders/other-loaders/ContentLoading";
import Login from "./components/Login";
import Signup from "./components/Signup";
// import ReactLoadingSkeleton from "./loaders/other-loaders/ReactLoadingSkeleton";
// import { SkeletonTheme } from "react-loading-skeleton";
const Alert = lazy(() => import("./alerts/Alert"));
const Footer = lazy(() => import("./components/Footer"));
const NavBar = lazy(() => import("./components/NavBar"));
const Developer = lazy(() => import("./developer/Developer"));
const AboutMe = lazy(() => import("./developer/aboutme/AboutMe"));
const Experties = lazy(() => import("./developer/experties/Experties"));
const Projects = lazy(() => import("./developer/projects/Projects"));

function App() {
  // progress bar states
  const [progress, setProgress] = useState(20);
  const location = useLocation();
  const isLoginOrSignupPage =
    location.pathname == "/login" || location.pathname == "/signup";

  // toggle mode dark/light
  const [mode, setMode] = useState({
    background: localStorage.getItem("background") || "dark",
    text: localStorage.getItem("text") || "light",
  });

  const [fontAwesomeClass, setFontAwesomeClass] = useState(
    localStorage.getItem("fontAwesomeClass") || "moon"
  );
  const handleToggleModeClick = () => {
    if (mode.background === "dark") {
      setMode({ background: "light", text: "dark" });
      setFontAwesomeClass("sun");
      document.body.style.backgroundColor = "#ffffff";
    } else {
      setMode({ background: "dark", text: "light" });
      setFontAwesomeClass("moon");
      document.body.style.backgroundColor = "#171a1d";
    }
  };

  useEffect(() => {
    localStorage.setItem("background", mode.background);
    localStorage.setItem("text", mode.text);
    localStorage.setItem("fontAwesomeClass", fontAwesomeClass);
    //default body background
    document.body.style.backgroundColor =
      localStorage.getItem("background") === "dark" ? "#171a1d" : "#ffffff";
  }, [mode, fontAwesomeClass]);

  return (
    <lightDarkModeContext.Provider value={mode}>
      <Suspense
        fallback={
          <div
            className={`bg-${mode.background} d-flex justify-content-center`}
            style={{
              height: "100vh",
              width: "100vw",
            }}
          >
            <ContentLoading count={1} />
          </div>
        }
      >
        <div className={`App ${mode.background} p-0`}>
          <LoadingBar color="#FF000D" waitingTime="300" progress={progress} />
          <AlertState>
            <NavBar
              ToggleFullScreen={ToggleFullScreen}
              name="It's me Mohit"
              dropMenu="Know"
              handleToggleModeClick={handleToggleModeClick}
              background={mode.background}
              text={mode.text}
              fontAwesomeClass={fontAwesomeClass}
            />

            <Alert />
            <Routes>
              <Route
                exact
                path="/"
                element={<Developer setProgress={setProgress} />}
              >
                <Route exact path="/aboutme" element={<AboutMe />} />
                <Route exact path="/experties" element={<Experties />} />
                <Route exact path="/projects" element={<Projects />} />
              </Route>

              <Route
                exact
                path="*"
                element={
                  <>
                    <h1>Not Found</h1>
                  </>
                }
              ></Route>
              <Route
                exact
                path="/login"
                element={<Login setProgress={setProgress} />}
              ></Route>
              <Route
                exact
                path="/signup"
                element={<Signup setProgress={setProgress} />}
              ></Route>
            </Routes>
            {isLoginOrSignupPage ? null : (
              <Footer background={mode.background} text={mode.text} />
            )}
          </AlertState>
        </div>
      </Suspense>
    </lightDarkModeContext.Provider>
  );
}

export default App;
