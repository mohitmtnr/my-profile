import React, { useContext, useEffect, useState } from "react";
import lightDarkModeContext from "../../context/LightDarkModeContext";
import alertContext from "../../context/AlertContext";

const AboutMeModal = () => {
  const mode = useContext(lightDarkModeContext);
  const { showAlert } = useContext(alertContext);
  const [formName, setformName] = useState();
  const [formData, setFormData] = useState({
    degree: "",
    startDate: "",
    endDate: "",
    boardOfEducation: "",
    university: "",
    percentage: "",
    subjects: "",
  });

  function handleOnChangeAddCard(e) {
    setFormData(() => ({ ...formData, [e.target.name]: e.target.value }));
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    const {
      degree,
      startDate,
      endDate,
      boardOfEducation,
      university,
      percentage,
      subjects,
    } = formData;

    const subjectsArray = subjects.split(",");

    //save to backend
    const url = "http://localhost:5000/profile/aboutme/createaboutme";

    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authToken: localStorage.getItem("authToken"),
      },
      body: JSON.stringify({
        degree,
        startDate,
        endDate,
        boardOfEducation,
        institution: university,
        percentageObtained: percentage,
        subjectStudied: subjectsArray,
      }),
    })
      .then((res) => res.json())
      .then((jsonRes) => {
        if (jsonRes.success) {
          window.location.reload();
          showAlert("success", jsonRes.success);
        } else {
          showAlert("warning", jsonRes.error);
        }
      })
      .catch((error) => showAlert("danger", error));
  }

  const AboutMeModal = document.getElementById("AboutMeModal");
  if (AboutMeModal) {
    AboutMeModal.addEventListener("show.bs.modal", (event) => {
      // Button that triggered the modal
      const button = event.relatedTarget;
      // Extract info from data-bs-* attributes
      const title = button.getAttribute("data-bs-whatever");

      // Update the modal's content.
      const modalTitle = AboutMeModal.querySelector(".modal-title");

      if (title == "add-card-0") {
        modalTitle.textContent = "Add Card";
        setformName(title);
      } else {
        modalTitle.textContent = "Edit Card";
        setformName(title);
      }
      // get body element
      const modalBody = document.getElementsByClassName("modal-body")[0];

      //clear pervious  data from modal
      const modalData = AboutMeModal.querySelectorAll(".form-control");
      modalData.forEach((element) => {
        element.value = "";
      });
    });
  }

  return (
    <div>
      <div
        className="modal fade "
        id="AboutMeModal"
        tabIndex="-1"
        aria-labelledby="AboutMeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog  modal-dialog-centered modal-dialog-scrollable">
          <div
            className={`modal-content text-${mode.text} bg-${mode.background}`}
          >
            <div className="modal-header p-2" style={{ border: "none" }}>
              <h1 className="modal-title fs-5 " id="AboutMeModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn btn-danger btn-sm d-flex "
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fa-solid fa-xmark align-self-center text-light" />
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleFormSubmit}>
                {formName === "add-card-0" || formName === "edit-card-0" ? (
                  <>
                    <div className="mb-3">
                      <input
                        type="text"
                        className={`form-control input-${mode.background}`}
                        name="degree"
                        placeholder="Degree*"
                        autoFocus
                        required
                        value={formData.degree}
                        onChange={handleOnChangeAddCard}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="date"
                        className={`form-control input-${mode.background}`}
                        autoFocus
                        name="startDate"
                        required
                        onChange={handleOnChangeAddCard}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="date"
                        className={`form-control input-${mode.background}`}
                        autoFocus
                        name="endDate"
                        required
                        onChange={handleOnChangeAddCard}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className={`form-control input-${mode.background}`}
                        name="boardOfEducation"
                        placeholder="Board Of Education"
                        autoFocus
                        onChange={handleOnChangeAddCard}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className={`form-control input-${mode.background}`}
                        name="university"
                        placeholder="School/University*"
                        autoFocus
                        required
                        onChange={handleOnChangeAddCard}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        title="Range 0-100"
                        type="number"
                        className={`form-control input-${mode.background}`}
                        name="percentage"
                        placeholder="Percentage Obtained*"
                        min={0}
                        max={100}
                        step="any"
                        autoFocus
                        required
                        onChange={handleOnChangeAddCard}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        title="Please enter comma separated values"
                        type="text"
                        className={`form-control input-${mode.background}`}
                        name="subjects"
                        placeholder="Subjects*"
                        autoFocus
                        required
                        onChange={handleOnChangeAddCard}
                      />
                    </div>
                  </>
                ) : formName === "edit-card-1" ? (
                  <>
                    <div className="mb-3">
                      <textarea
                        type="text"
                        className={`form-control input-${mode.background}`}
                        id="description"
                        placeholder="Description*"
                        autoFocus
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="date"
                        className={`form-control input-${mode.background}`}
                        id="dob"
                        autoFocus
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <input
                        title="Please enter comma separated urls"
                        type="url"
                        className={`form-control input-${mode.background}`}
                        id="board-of-education"
                        placeholder="Online  Profile Link"
                        autoFocus
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className={`form-control input-${mode.background}`}
                        id="highest-qualification"
                        placeholder="Highest Qualification*"
                        autoFocus
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className={`form-control input-${mode.background}`}
                        id="belong-state"
                        placeholder="which state do you belong from?*"
                        autoFocus
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className={`form-control input-${mode.background}`}
                        id="current-city"
                        placeholder="Current City*"
                        autoFocus
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        title="Please enter comma separated values"
                        type="text"
                        className={`form-control input-${mode.background}`}
                        id="hobbies"
                        placeholder="Hobbies*"
                        autoFocus
                        required
                      />
                    </div>
                  </>
                ) : (
                  ""
                )}
                <div
                  className="modal-footer py-0 px-0"
                  style={{ border: "none" }}
                >
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn d-purple"
                    style={{
                      border: "none",
                    }}
                  >
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMeModal;
