import React from "react";

const Card = ({ rocket }) => {
  console.log("card comp prop here ---_>", rocket.id);
  return (
    <div className="col-lg-4 col-sm-6">
      <div className="card">
        <img
          src={rocket ? rocket.ships[1]?.image : <p>"No image available"</p>}
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{rocket.mission_name}</h5>
          <p className="card-text">Site: {rocket.launch_site.site_name}</p>
          <p className="card-text">Date: {rocket.launch_date_local}</p>
          <a
            href={`#${rocket.id}`}
            className="btn btn-primary"
            data-toggle="modal"
            data-target={`#${rocket.id}`}
          >
            Details
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
