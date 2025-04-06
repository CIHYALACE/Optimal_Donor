import React from 'react'
import ProgressBar from './ProgressBar'

export default function Card5({ title, text, imgSrc, totalAmount , currentAmount }) {

    return (
      <>
        <div className="card mb-3 col-12 bg-white border-0">
          <div className="row g-0">
            <div className="col-md-4">
              <img src={imgSrc} className="img-fluid rounded-start" alt="..." />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text mb-5">{text}</p>
                <ProgressBar currentAmount={currentAmount} totalAmount={totalAmount} />
                <p className="card-text">${currentAmount}/${totalAmount}</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  