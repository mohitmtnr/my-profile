import React, { memo } from "react";
import { useContext } from "react";
import lightDarkModeContext from "../../context/LightDarkModeContext";
import RemoveElements from "./RemoveElements";

const ExpertiesCard = (props) => {
  const mode = useContext(lightDarkModeContext);

  const {
    title,
    description,
    duration,
    companyName,
    websiteLink,
    usedWebTechnologies,
    experiencedGained,
    webTechnologyFontAwesomeTag,
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
          <i className={`${webTechnologyFontAwesomeTag} mr-5`} />
          <span>{title}</span>
        </h5>
        {/* only visible when logged in*/}
        {localStorage.getItem("authToken") && (
          <div className="card-control justify-content-between ">
            <i
              className="fa-solid fa-pen-to-square align-self-center mx-2 fs-6 "
              data-bs-toggle="modal"
              data-bs-target="#projectModal"
              data-bs-whatever="edit-card-0"
            />
            <i
              className="fa-solid fa-trash-can align-self-center mx-2 fs-6"
              data-role="remove-card"
              onClick={RemoveElements}
            />
          </div>
        )}
      </div>
      <div className="card-body text-secondary">
        <ul>
          <li>{companyName}</li>
          <li>{description}</li>
          <li> {duration}</li>
          <li>{experiencedGained} %</li>
          {websiteLink && <li>{websiteLink}</li>}
          {usedWebTechnologies &&
            usedWebTechnologies.map((tech, index) => (
              <li key={index}>{tech}</li>
            ))}
        </ul>
        <p className="card-text">
          <small>Last updated : {updatedTime}</small>
        </p>
      </div>
    </div>
  );
};

export default memo(ExpertiesCard);
