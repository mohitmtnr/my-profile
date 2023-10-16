import React, { useContext, useState } from "react";
import lightDarkModeContext from "../../context/LightDarkModeContext";
import alertContext from "../../context/AlertContext";

const ExpertiesModal = () => {
  const mode = useContext(lightDarkModeContext);
  const { showAlert } = useContext(alertContext);

  const [formName, setformName] = useState();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    referralLink: "",
    topicsHighlight: "",
    webTechnologyFontawesomeClassName: "",
    experience: "",
  });

  function handleOnChangeAddCard(e) {
    setFormData(() => ({ ...formData, [e.target.name]: e.target.value }));
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    const {
      title,
      description,
      referralLink,
      topicsHighlight,
      webTechnologyFontawesomeClassName,
      experience,
    } = formData;

    const topicsHighlightArray = topicsHighlight.split(",");

    //save to backend
    const url = "http://localhost:5000/profile/experties/createexperties";

    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authToken: localStorage.getItem("authToken"),
      },

      body: JSON.stringify({
        title,
        description,
        referralLinks: referralLink,
        highlightTopics: topicsHighlightArray,
        WebTechnologyFontAwesomeTag: webTechnologyFontawesomeClassName,
        experience,
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

  const expertiesModal = document.getElementById("expertiesModal");
  if (expertiesModal) {
    expertiesModal.addEventListener("show.bs.modal", (event) => {
      // Button that triggered the modal
      const button = event.relatedTarget;
      // Extract info from data-bs-* attributes
      const title = button.getAttribute("data-bs-whatever");

      // Update the modal's content.
      const modalTitle = expertiesModal.querySelector(".modal-title");

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
      const modalData = expertiesModal.querySelectorAll(".form-control");
      modalData.forEach((element) => {
        element.value = "";
      });
    });
  }

  return (
    <div>
      <div
        className="modal fade "
        id="expertiesModal"
        tabIndex="-1"
        aria-labelledby="expertiesModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog  modal-dialog-centered modal-dialog-scrollable">
          <div
            className={`modal-content text-${mode.text} bg-${mode.background}`}
          >
            <div className="modal-header p-2" style={{ border: "none" }}>
              <h1 className="modal-title fs-5 " id="expertiesModalLabel">
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
                {formName === "add-card-0" ? (
                  <>
                    <div className="mb-3">
                      <input
                        type="text"
                        className={`form-control input-${mode.background}`}
                        name="title"
                        placeholder="title*"
                        autoFocus
                        required
                        onChange={handleOnChangeAddCard}
                      />
                    </div>
                    <div className="mb-3">
                      <textarea
                        type="text"
                        className={`form-control input-${mode.background}`}
                        name="description"
                        placeholder="Description*"
                        autoFocus
                        required
                        onChange={handleOnChangeAddCard}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="url"
                        className={`form-control input-${mode.background}`}
                        name="referralLink"
                        placeholder="Refer Where To Learn This Skill : url"
                        autoFocus
                        onChange={handleOnChangeAddCard}
                      />
                    </div>

                    <div className="mb-3">
                      <input
                        title="Please enter comma separated values"
                        type="text"
                        className={`form-control input-${mode.background}`}
                        name="topicsHighlight"
                        placeholder="Highlight Topics*"
                        autoFocus
                        required
                        onChange={handleOnChangeAddCard}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className={`form-control input-${mode.background}`}
                        name="webTechnologyFontawesomeClassName"
                        placeholder="Web Technology FontAwesome Class Name*"
                        autoFocus
                        required
                        onChange={handleOnChangeAddCard}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="number"
                        className={`form-control input-${mode.background}`}
                        name="experience"
                        placeholder="experience*"
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
                        name="description"
                        placeholder="Description*"
                        autoFocus
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        title="Please enter comma separated values"
                        type="text"
                        className={`form-control input-${mode.background}`}
                        name="programmingLanguagesKnown"
                        placeholder="Programming Languages Known*"
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

export default ExpertiesModal;
