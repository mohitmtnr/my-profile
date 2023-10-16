import React, { useContext, useEffect, useState } from "react";
import lightDarkModeContext from "../../context/LightDarkModeContext";
import Card from "../cards/ProjectsCard";
import "../cards/cards.css";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
// import { GetItems } from "../../redux/action-creator/AboutMeActions";
import ContentLoading from "../../loaders/other-loaders/ContentLoading";
// import { fetchProjects } from "../../redux/slice-usage/ProjectsSlice";
import alertContext from "../../context/AlertContext";
import { projectAsyncThunk } from "../../redux/slice-usage/ProjectsSlice";
import { fetchAsyncData } from "../../redux/async-fetch/fetchDataForAll";
import ProjectModal from "../modals/ProjectsModal";

export default function Experties() {
  const mode = useContext(lightDarkModeContext);
  const cards = useSelector((state) => state.projects.data);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  async function fetchData() {
    const response = await fetchAsyncData("developer/getdeveloper");
    response && setData(response.projects);
  }
  useEffect(() => {
    document.title = "Projects";
    dispatch(projectAsyncThunk("projects/getprojects"));
    fetchData();
  }, []);

  return (
    <>
      {/* About me Main content  */}
      <div className="container ">
        <div className="row my-4 mt-5">
          <div className="col-sm-12 ">
            <div
              className={`card primary-card bg-${mode.background} text-${mode.text}`}
              style={{ border: "none" }}
            >
              <div className="card-header d-flex justify-content-between w-100">
                <h4>
                  <i className="fa-solid fa-list-check fa-bounce"></i>
                  <span>&nbsp;Projects</span>
                </h4>
                {/* only visible when logged in*/}
                {localStorage.getItem("authToken") && (
                  <div className="card-control d-flex">
                    <i
                      className="fa-solid fa-pen-to-square align-self-center fs-4 align-self-center"
                      data-bs-toggle="modal"
                      data-bs-target="#projectModal"
                      data-bs-whatever="edit-card-1"
                    />
                  </div>
                )}
              </div>
              <div className="card-body">
                <div className="my-image-container">
                  <img
                    id="my-img"
                    loading="lazy"
                    // src={myImage}
                    alt="myImage"
                    className="mx-2"
                  />
                  <div className="primary-card-text">
                    <p className="card-text text-secondary ">
                      {data.length != 0 ? (
                        data.map((e) => (
                          <li key={e.id} className="text-light">
                            {e.description}
                          </li>
                        ))
                      ) : (
                        <li
                          className="bg-transparent d-flex justify-content-center"
                          style={{ zIndex: 1 }}
                        >
                          <ContentLoading count={3} />
                        </li>
                      )}
                    </p>
                    <a
                      href="https://www.linkedin.com/in/mohit-498043204/"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="btn m-purple my-3 mx-2 float-start"
                    >
                      Linkedin Profile
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* education */}
        <div id="cards-container" className="row my-0">
          {cards ? (
            cards.map((data) => (
              <div
                key={data._id}
                id={data._id}
                data-name="projects"
                className="element-card col-md-6  my-1"
              >
                <Card
                  id={data._id}
                  title={data.title}
                  description={data.description}
                  duration={data.startDate + "-" + data.endDate}
                  companyName={data.companyName}
                  websiteLink={data.websiteLink ? data.websiteLink : null}
                  usedWebTechnologies={data.usedWebTechnologies}
                  experiencedGained={data.experiencedGained}
                  WebTechnologyFontAwesomeTag={data.WebTechnologyFontAwesomeTag}
                  date={data.date}
                />
              </div>
            ))
          ) : (
            <li
              className="bg-transparent d-flex justify-content-center"
              style={{ zIndex: 1 }}
            >
              <ContentLoading count={3} />
            </li>
          )}
        </div>
        {/* This  will only be visible if I am login */}
        {localStorage.getItem("authToken") && (
          <>
            <div
              id="add-secondary-cards"
              className="add-cards text-light text-center my-5 fs-2"
            >
              <i
                type="button"
                className="fa-solid fa-plus m-purple rounded-2 py-1"
                data-bs-toggle="modal"
                data-bs-target="#projectModal"
                data-bs-whatever="add-card-0"
              ></i>
            </div>
            <ProjectModal />
          </>
        )}
      </div>
    </>
  );
}
