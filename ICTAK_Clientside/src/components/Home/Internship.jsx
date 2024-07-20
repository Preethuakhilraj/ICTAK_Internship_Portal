import React from "react";
import "./Internship.css";


const Internship = ({title,image,description}) => {
  return (
    <div className="card-tb">
      <div className="image-tb">
        <img src={image} alt="" />
      </div>

      <div className="card-content">
        <div className="card-title">
          <h3>{title}</h3>
        </div>
        <div className="card-body">
          <p>
           {description}
          </p>
        </div>
        <div className="btn3">
          <button>Apply</button>
        </div>
      </div>
    </div>
  );
};

export default Internship;
