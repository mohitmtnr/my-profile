import React from "react";
import { useContext } from "react";
import lightDarkModeContext from "../../context/LightDarkModeContext";
import { useDispatch } from "react-redux";
import { DeleteItems } from "../../redux/action-creator/AboutMeActions";
import alertContext from "../../context/AlertContext";

const ExpertiesCard = (props) => {
  const mode = useContext(lightDarkModeContext);
  const dispatch = useDispatch();
  const { showAlert } = useContext(alertContext);
  const {
    id,
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
        <div className="card-control justify-content-between ">
          <i
            className="fa-solid fa-pen-to-square align-self-center mx-2 fs-6 "
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            data-bs-whatever="Edit Card"
          />
          <i
            className="fa-solid fa-trash-can align-self-center mx-2 fs-6"
            onClick={() => {
              const response = window.confirm(
                "Would you like to delete the card?"
              );
              if (response == true) {
                dispatch(DeleteItems(id));
                showAlert("success", "One item successfully deleted!");
              } else {
                showAlert("danger", "Deletion cancelled Successfully!");
              }
            }}
          />
        </div>
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

export default ExpertiesCard;
