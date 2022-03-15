import React from 'react';
import {Button} from "../Button/Button";

const Card = (props) => {



    return (

        <div className="card card-bordered card-compact content-center m-5">
            <figure>
                <img src="https://picsum.photos/id/1005/400/250" alt="photo aléatoire"/>
            </figure>
            <div className="card-body">
                <h2 className="card-title">{props.name}</h2>
                <p>Description aléatoire</p>
                {props.cart?.some(plate => plate.id === props.plate.id) ?
                    <div className="place-content-center">
                        <button className="rounded-full rounded-full bg-orange-600 w-8 h-8 text-white mr-3 text-lg"
                                onClick={props.removeFromCart}>
                            -
                        </button>
                        <span className="text-lg">
                            {props.cart?.filter(plate => plate.id === props.plate.id).length}
                        </span>
                        <button className="rounded-full bg-orange-600 w-8 h-8 text-white ml-3 text-lg"
                                onClick={props.addToCart}>
                            +
                        </button>
                    </div> :
                    <Button classStyle={' btn-primary animate__animated animate__bounce'}
                            onClick={props.addToCart}>
                        Commander
                    </Button>
                }
            </div>
        </div>
    );
}

export default Card;
