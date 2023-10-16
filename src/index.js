import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import Store from "./redux/store/Store";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";

// import { SkeletonTheme } from "react-loading-skeleton";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <React.StrictMode>
      {/* <SkeletonTheme baseColor="#202020" highlightColor="#444"> */}
      <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
        <Provider store={Store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </GoogleOAuthProvider>
      {/* </SkeletonTheme> */}
    </React.StrictMode>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
