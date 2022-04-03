import {Button} from "../Button/Button";
import React from "react";
import {GrCircleInformation} from "react-icons/gr";
import '../../css/card.css';
import '../../css/overlayInformaiton.css';

const Card = ({name, cart, plateProps, removeFromCart, addToCart, setDisplayModal}) => {
    return (
        <div className="card card-bordered card-compact content-center m-5">
            <figure>
                <img src="https://picsum.photos/id/1005/400/250" alt="photo aléatoire"/>
            </figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>Description aléatoire</p>
                {cart?.some(plate => plate.id === plateProps.id) ?
                    <div className="place-content-center">
                        <button className="rounded-full rounded-full bg-orange-600 w-8 h-8 text-white mr-3 text-lg"
                                onClick={removeFromCart}>
                            -
                        </button>
                        <span className="text-lg">
                            {cart?.filter(plate => plate.id === plateProps.id).length}
                        </span>
                        <button className="rounded-full bg-orange-600 w-8 h-8 text-white ml-3 text-lg"
                                onClick={addToCart}>
                            +
                        </button>
                    </div> :
                    <div>

                        <Button classStyle={' btn-primary animate__animated animate__bounce'}
                                onClick={addToCart}>
                            Commander
                        </Button>
                        <div className="information-wrapper">
                            <button className="Button CenterAlign" onClick={setDisplayModal}>
                                <GrCircleInformation/>
                            </button>
                        </div>
                    </div>
                }

            </div>
        </div>
    );
};

export default Card;
