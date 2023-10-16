import React, { memo } from "react";
import { useContext } from "react";
import lightDarkModeContext from "../../context/LightDarkModeContext";
import RemoveElements from "./RemoveElements";

const Card = (props) => {
  const mode = useContext(lightDarkModeContext);

  const {
    degree,
    institute,
    duration,
    percentage,
    boardOfEducation,
    date,
    subjects,
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
          <i className="fa-solid fa-graduation-cap fa-bounce mr-5" />
          <span> {degree}</span>
        </h5>

        {/* only visible when logged in*/}

        {localStorage.getItem("authToken") && (
          <div className="card-control justify-content-between ">
            <i
              className="fa-solid fa-pen-to-square align-self-center mx-2 fs-6 "
              data-bs-toggle="modal"
              data-bs-target="#AboutMeModal"
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
        <ul style={{ listStyle: "none" }}>
          <li className={`text-${mode.text}`}>
            <span className={`text-secondary`}>University/School : </span>
            {institute}
          </li>
          <li className={`text-${mode.text}`}>
            <span className={`text-secondary`}>Course Duration : </span>
            {duration}
          </li>
          <li className={`text-${mode.text}`}>
            <span className={`text-secondary`}>Percentage : </span>
            {percentage} %
          </li>
          {boardOfEducation && (
            <li className={`text-${mode.text}`}>
              <span className={`text-secondary`}>Board Of Education : </span>
              {boardOfEducation}
            </li>
          )}
          {subjects && (
            <div>
              <span className={`text-secondary`}>Subjects : </span>
              {subjects.map((sub, i) => (
                <li
                  className={`text-${mode.text} text-capitalize mx-4 px-5`}
                  key={i}
                >
                  {sub}
                </li>
              ))}
            </div>
          )}
        </ul>

        <p className="card-text">
          <small>Last updated : {updatedTime}</small>
        </p>
      </div>
    </div>
  );
};

export default memo(Card);
