import React from 'react';
import { Button } from "../Button/Button";
import {Link} from "react-router-dom";
const Card = (props) => {
    let plateIdString = props.plateId.toString();

    return (
        <div className="card card-bordered card-compact content-center m-5">
            <figure>
                <img src="https://picsum.photos/id/1005/400/250"  alt="photo aléatoire"/>
            </figure>
            <div className="card-body">
                <h2 className="card-title">{props.name}</h2>
                <p>Description aléatoire</p>
                <Link className="btn btn-primary" to={`${plateIdString}`} state={{ plateName: props.name, restaurant: props.restaurant }}>
                    <Button title="Commander" />
                </Link>
            </div>
        </div>
    );
}

export default Card;