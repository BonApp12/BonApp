import {Button} from "../Button/Button";
import React from "react";
import {GrCircleInformation} from "react-icons/gr";
import '../../css/overlayInformaiton.css';

const Card = ({name, cart, plateProps, removeFromCart, addToCart, setDisplayModal}) => {
    return (
        <div className="card card-bordered card-compact content-center m-5 shadow-on-plate">
            <figure>
                <img
                    src={`${process.env.REACT_APP_URL_BACKEND}plate/uploads/${plateProps?.photo || 'img.png'}`}
                    alt={name}/>
            </figure>
            <div className="card-body">
                <div>
                    <h2 className="card-title">{name}</h2>
                </div>

                {cart?.some(plate => plate.id === plateProps.id) ?
                    <div className="items-center justifiy-center flex">
                        <button className="rounded-full rounded-full btn-quantity-minus w-8 h-8 text-white mr-3 text-lg"
                                onClick={removeFromCart}>
                            -
                        </button>
                        <span className="text-lg quantity">
                            {plateProps.quantity}
                        </span>
                        <button className="rounded-full btn-quantity w-8 h-8 text-white ml-3 text-lg"
                                onClick={addToCart}>
                            +
                        </button>
                    </div> :
                    <div>

                        <Button classStyle={'btn btn-xs add-to-cart'}
                                onClick={addToCart}>
                            Commander
                        </Button>
                    </div>
                }
                <div className="information-wrapper">
                    <button className="Button CenterAlign" onClick={setDisplayModal}>
                        <GrCircleInformation/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;
