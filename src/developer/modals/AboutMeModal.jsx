import React, { useContext } from "react";
import ReactDom from "react-dom";
import lightDarkModeContext from "../../context/LightDarkModeContext";

const AboutMeModal = () => {
  const mode = useContext(lightDarkModeContext);
  const exampleModal = document.getElementById("exampleModal");
  if (exampleModal) {
    exampleModal.addEventListener("show.bs.modal", (event) => {
      // Button that triggered the modal
      const button = event.relatedTarget;
      // Extract info from data-bs-* attributes
      const recipient = button.getAttribute("data-bs-whatever");
      // If necessary, you could initiate an Ajax request here
      // and then do the updating in a callback.

      // Update the modal's content.
      const modalTitle = exampleModal.querySelector(".modal-title");
      modalTitle.textContent = recipient;

      //clear pervious  data from modal
      const modalData = exampleModal.querySelectorAll(".form-control");
      console.log(modalData.length);
      modalData.forEach((element) => {
        element.value = "";
      });
    });
  }

  return ReactDom.createPortal(
    <div>
      <div
        className="modal fade "
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog  modal-dialog-centered modal-dialog-scrollable">
          <div
            className={`modal-content text-${mode.text} bg-${mode.background}`}
          >
            <div className="modal-header p-2" style={{ border: "none" }}>
              <h1 className="modal-title fs-5 " id="exampleModalLabel">
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
              <form>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Recipient:
                  </label>
                  <input
                    type="text"
                    className={`form-control input-${mode.background}`}
                    id="recipient-name"
                    autoFocus
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">
                    Message:
                  </label>
                  <textarea
                    className={`form-control input-${mode.background}`}
                    id="message-text"
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer" style={{ border: "none" }}>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn d-purple">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal-portal")
  );
};

export default AboutMeModal;
