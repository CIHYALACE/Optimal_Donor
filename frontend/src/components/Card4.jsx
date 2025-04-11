import React from 'react'
import ProgressBar from './ProgressBar'
export default function Card4({image , title , totalAmount , currentAmount , link}) {
    return (
        <>
            <a href={link} className="card m-2 col-12 col-md-4">
                <div style={{ width: '100%', height: '200px', overflow: 'hidden' }}>
                    <img 
                        src={image} 
                        className="card-img-top" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                </div>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <ProgressBar currentAmount={currentAmount} totalAmount={totalAmount} />
                    <p className="card-text">${currentAmount}/${totalAmount}</p>
                </div>
            </a>
        </>
    )
}