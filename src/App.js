// import logo from "./logo.svg";
import React, { useState, lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import AlertState from "./states/AlertState";
import lightDarkModeContext from "./context/LightDarkModeContext";
import ToggleFullScreen from "./components/ToggleFullScreen";
import "./App.css";
import ContentLoading from "./loaders/other-loaders/ContentLoading";
// import ReactLoadingSkeleton from "./loaders/other-loaders/ReactLoadingSkeleton";
// import { SkeletonTheme } from "react-loading-skeleton";
const Alert = lazy(() => import("./alerts/Alert"));
const Footer = lazy(() => import("./components/Footer"));
const Texedi = lazy(() => import("./components/Texedi"));
const NavBar = lazy(() => import("./components/NavBar"));
const Developer = lazy(() => import("./developer/Developer"));
const AboutUs = lazy(() => import("./components/AboutUs"));
const AboutMe = lazy(() => import("./developer/aboutme/AboutMe"));
const Experties = lazy(() => import("./developer/experties/Experties"));
const Projects = lazy(() => import("./developer/projects/Projects"));
const ContactMe = lazy(() => import("./developer/contactme/ContactMe"));
const CurrentStatus = lazy(() =>
  import("./developer/current-status/CurrentStatus")
);

function App() {
  // progress bar states
  const [progress, setProgress] = useState(20);

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
    } else {
      setMode({ background: "dark", text: "light" });
      setFontAwesomeClass("moon");
    }
  };

  useEffect(() => {
    localStorage.setItem("background", mode.background);
    localStorage.setItem("text", mode.text);
    localStorage.setItem("fontAwesomeClass", fontAwesomeClass);
  }, [mode, fontAwesomeClass]);

  return (
    <lightDarkModeContext.Provider value={mode}>
      <Suspense
        fallback={
          <div
            className={`bg-${mode.background} d-flex justify-content-center`}
            style={{ height: "100vh", width: "100vw" }}
          >
            <ContentLoading count={1} />
          </div>
        }
      >
        <div className={`App ${mode.background} p-0`}>
          <LoadingBar
            color="#FF000D"
            waitingTime="300"
            progress={progress}
            // onLoaderFinished={() => setProgress(0)}
          />

          <NavBar
            ToggleFullScreen={ToggleFullScreen}
            name="Developer"
            title="TeXeDi"
            dropMenu="Know"
            handleToggleModeClick={handleToggleModeClick}
            background={mode.background}
            text={mode.text}
            fontAwesomeClass={fontAwesomeClass}
          />
          <AlertState>
            <Alert />
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <Texedi
                    setProgress={setProgress}
                    title="Let's jump into text editor"
                    button="5"
                  />
                }
              ></Route>
              <Route
                exact
                path="/developer"
                element={<Developer setProgress={setProgress} />}
              >
                <Route exact path="/developer/aboutme" element={<AboutMe />} />
                <Route
                  exact
                  path="/developer/experties"
                  element={<Experties />}
                />
                <Route
                  exact
                  path="/developer/projects"
                  element={<Projects />}
                />
                <Route
                  exact
                  path="/developer/contactme"
                  element={<ContactMe />}
                />
                <Route
                  exact
                  path="/developer/currentstatus"
                  element={<CurrentStatus />}
                />
              </Route>

              <Route
                exact
                path="/about"
                element={<AboutUs setProgress={setProgress} />}
              ></Route>
              <Route
                exact
                path="*"
                element={
                  <>
                    <h1>Not Found</h1>
                  </>
                }
              ></Route>
            </Routes>

            <Footer background={mode.background} text={mode.text} />
          </AlertState>
        </div>
      </Suspense>
    </lightDarkModeContext.Provider>
  );
}

export default App;

// react loading skeleton

// <SkeletonTheme
//             baseColor={mode.background === "dark" ? "#33393E" : ""}
//             highlightColor={mode.background === "dark" ? "#7C848B" : ""}
//             duration={4}
//           >
//             <ReactLoadingSkeleton />
//           </SkeletonTheme>
