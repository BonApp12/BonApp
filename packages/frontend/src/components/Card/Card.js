import React, { Component } from 'react';

const Card = ({name}) => {
    return (
        <div className="card card-bordered card-compact content-center m-5">
            <figure>
                <img src="https://picsum.photos/id/1005/400/250"  alt="photo aléatoire"/>
            </figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>Description aléatoire</p>
            </div>
        </div>
    );
}

export default Card;