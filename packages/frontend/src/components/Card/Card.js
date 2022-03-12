import React from 'react';
import {Button} from "../Button/Button";

const Card = (props) => {
    // let plateIdString = props.plateId.toString();
    // console.log(props);

    function addToCart() {
        console.log(props.cart)
        props.updateCart([...props.cart, props.plate])
    }

    return (
        <div className="card card-bordered card-compact content-center m-5">
            <figure>
                <img src="https://picsum.photos/id/1005/400/250" alt="photo aléatoire"/>
            </figure>
            <div className="card-body">
                <h2 className="card-title">{props.name}</h2>
                <p>Description aléatoire</p>
                {/*<Link to={`${plateIdString}`} state={{ plateName: props.name, restaurant: props.restaurant }}>*/}
                <Button title="Commander" onClick={addToCart}/>
                {/*</Link>*/}
            </div>
        </div>
    );
}

export default Card;
