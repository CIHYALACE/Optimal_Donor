import React from "react";
import ProgressBar from "./ProgressBar";

export default function Card6({title, text, imgSrc, totalAmount, currentAmount}) {
  return (
    <>
      <div className="card bg-inherit border-0 flex-md-nowrap text-white m-md-0 mb-3 col-12 col-md-4">
        <img src={imgSrc} className="card-img" alt="..." />
        <div className="card-img-overlay d-flex flex-column justify-content-end align-items-start">
          <h5 className="card-title">{title}</h5>
          <p className="d-none d-md-block card-text">{text}</p>
          <div className="w-75">
            <ProgressBar
              currentAmount={currentAmount}
              totalAmount={totalAmount}
            />
          </div>
          <p className="card-text">
              <small>${currentAmount}/${totalAmount}</small>
          </p>
        </div>
      </div>
    </>
  );
}
