import React, { memo } from "react";
import { useContext } from "react";
import lightDarkModeContext from "../../context/LightDarkModeContext";
import { useDispatch } from "react-redux";
import RemoveElements from "./RemoveElements";

const ExpertiesCard = (props) => {
  const mode = useContext(lightDarkModeContext);
  const dispatch = useDispatch();

  const {
    title,
    description,
    WebTechnologyFontAwesomeTag,
    experience,
    highlightedTopics,
    imageUrl,
    referralLinks,
    date,
  } = props;

  const update = new Date(date);
  const updatedTime =
    update.getDate() +
    "-" +
    (update.getMonth() + 1) +
    "-" +
    update.getFullYear();

  return (
    <div
      className={`card secondary-card bg-${mode.background} text-${mode.text} my-3 `}
    >
      <div className="card-header d-flex justify-content-between">
        <h5>
          <i className={`${WebTechnologyFontAwesomeTag} mr-5`} />
          <span>&nbsp;{title}</span>
        </h5>
        {/* only visible when logged in*/}
        {localStorage.getItem("authToken") && (
          <div className="card-control justify-content-between ">
            <i
              className="fa-solid fa-pen-to-square align-self-center mx-2 fs-6 "
              data-bs-toggle="modal"
              data-bs-target="#expertiesModal"
              data-bs-whatever="edit-card-0"
            />
            <i
              data-role="remove-card"
              className="fa-solid fa-trash-can align-self-center mx-2 fs-6"
              onClick={RemoveElements}
            />
          </div>
        )}
      </div>
      <div className="card-body text-secondary">
        <ul>
          <li>{description}</li>
          <li> {experience}</li>\{" "}
          {highlightedTopics &&
            highlightedTopics.map((topics, index) => (
              <li key={index}>{topics}</li>
            ))}
          {referralLinks &&
            referralLinks.map((link, index) => <li key={index}>{link}</li>)}
        </ul>
        <p className="card-text">
          <small>Last updated : {updatedTime}</small>
        </p>
      </div>
    </div>
  );
};

export default memo(ExpertiesCard);
