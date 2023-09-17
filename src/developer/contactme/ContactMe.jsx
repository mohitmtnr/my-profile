import React, { useContext } from "react";
import lightDarkModeContext from "../../context/LightDarkModeContext";

const ContactMe = () => {
  const mode = useContext(lightDarkModeContext);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 mb-3 mb-sm-0">
            <div
              className={`card bg-${mode.background} text-${mode.text} my-5`}
            >
              <div className="card-header">Featured</div>
              <div className="card-body">
                <h5 className="card-title">{mode.background}</h5>
                <p className="card-text">Contact me</p>
                <a href="/" className="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactMe;
