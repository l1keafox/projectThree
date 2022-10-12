import { FaHamburger } from "react-icons/fa";
import "./Settings.css";
// import "./colors.css";
import Header from "../Header/Header";
function Settings({ handleClose, show, children }) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const handleFormSubmit = (e) => {
    e.preventDefault();
  };
  const colorKeys = [
    "Fuscia",
    "Red",
    "Orange",
    "Tangerine",
    "Carrot",
    "Yellow",
    "Lime",
    "Green",
    "Dark Green",
    "Sea Foam Green",
    "Turquoise",
    "Teal",
    "Aegean Blue",
    "Sky Blue",
    "Navy",
    "Purple",
    "White",
    "Black",
  ];

  return (
    (
      <div className={showHideClassName}>
        <button
          type="button"
          className="btn launch-button"
          data-bs-toggle="modal"
          data-bs-target="#launchModal"
        ></button>
      </div>
    ),
    (
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="settings">
                Settings
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <select
                className="form-select"
                aria-label="Screen-text-color"
                defaultValue={"Fuscia"}
              >
                <option>Screen Text Color</option>
                {colorKeys.map((opt) => (
                  <option key={opt}>opt</option>
                ))}
              </select>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleFormSubmit}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
export default Settings;
