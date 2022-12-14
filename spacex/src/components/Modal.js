import React from "react";
import { gql, useMutation } from "@apollo/client";

const saveQuery = gql`
  mutation saveLaunch($launch: SaveLaunchInput) {
    saveLauch(launch: $launch) {
      id: id
      title: title
    }
  }
`;

const Modal = ({ rocket }) => {
  const [saveData, saveDataDb] = useMutation(saveQuery);

  if (saveDataDb.loading) {
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );
  }

  if (saveDataDb.error) {
    return (
      <div>
        <h3>Error...</h3>
        <p>{saveDataDb.error.message}</p>
      </div>
    );
  }

  return (
    <div
      className="modal"
      id={`${rocket.id}`}
      data-backdrop="static"
      data-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog-sm">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              Rocket: {rocket.rocket.rocket_name}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              data-bs-dismiss="modal"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <img
              src={rocket.ships[1]?.image}
              className="img-fluid max-width: 100% height: auto"
              alt="..."
            />

            <div className="row rocket-info">
              <div className="col-sm-4">
                <h4>Height:</h4>
                <p>{rocket.rocket.rocket.height.feet} Feet</p>
              </div>
              <div className="col-sm-4">
                <h4>Mass:</h4>
                <p>{rocket.rocket.rocket.mass.kg} kilos</p>
              </div>
              <div className="col-sm-4">
                <h4>Active</h4>
                <p>{rocket.rocket.rocket.active ? `yes` : `No`}</p>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={() => {
                const launch = {
                  id: rocket.id,
                  title: rocket.rocket.rocket_name,
                };
                saveData({
                  variables: {
                    launch: launch,
                  },
                });
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
