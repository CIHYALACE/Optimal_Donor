import React from 'react'
import ProgressBar from './ProgressBar'
export default function Card4({image , title , totalAmount , currentAmount , link}) {
    return (
        <>
            <a href={link} className="card m-2 col-12 col-md-4">
                <img src={image} className="card-img-top"/>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <ProgressBar currentAmount={currentAmount} totalAmount={totalAmount} />
                    <p className="card-text">${currentAmount}/${totalAmount}</p>
                </div>
            </a>
        </>
    )
}