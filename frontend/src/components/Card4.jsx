import React from 'react'

export default function Card4({image , title , amount , currentAmount , link}) {
    return (
        <>
            <a href={link} className="card m-2 col-12 col-md-4">
                <img src={image} className="card-img-top"/>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{currentAmount}/{amount}</p>
                </div>
            </a>
        </>
    )
}