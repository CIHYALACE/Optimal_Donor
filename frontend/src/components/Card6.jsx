import React from "react";
import ProgressBar from "./ProgressBar";

export default function Card6({title, text, imgSrc, totalAmount, currentAmount}) {
  return (
    <>
      <div className="card bg-inherit border-0 flex-md-nowrap text-white m-0 col-12 col-md-4">
        <img src={imgSrc} className="card-img" alt="..." />
        <div className="card-img-overlay">
          <h5 className="card-title">{title}</h5>
          <p className="card-text mb-5">{text}</p>
          <ProgressBar
            currentAmount={currentAmount}
            totalAmount={totalAmount}
          />
            <p className="card-text">
                <small>${currentAmount}/{totalAmount}</small>
            </p>
        </div>
      </div>
    </>
  );
}
