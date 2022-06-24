import {slide as Menu} from 'react-burger-menu';
import {useContext, useState} from 'react';
import {SlidingContext} from '../../context/sliding';
import {useRecoilState} from "recoil";
import {cartAtom} from "../../states/cart";
import '../../css/cart.css';
import {Button} from "../Button/Button";
import {MdOutlineClose, MdOutlinePayment} from "react-icons/md";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import {cloneDeep} from "tailwindcss/lib/util/cloneDeep";

// create a navigation component that wraps the burger menu
export const Sliding = (props) => {
    const ctx = useContext(SlidingContext);
    const [cart, updateCart] = useRecoilState(cartAtom);
    const [isCheckout, setIsCheckout] = useState(false);
    const [stripeOptions, setStripeOptions] = useState({});
    const totalAmount = cart.reduce((partialSum, a) => partialSum + parseFloat(a.price) * a.quantity, 0);
    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

    function formattedCart() {
        let typesArray = {};

        cart.forEach(item => {
            if (!typesArray[item.type]) {
                typesArray[item.type] = {
                    name: item.type,
                    items: []
                }
            }
            if (!typesArray[item.type]['items'][item.id]) {
                typesArray[item.type]['items'][item.id] = {
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                }
            } else {
                typesArray[item.type]['items'][item.id].quantity++;
            }
        })

        return Object.values(typesArray);
    }

    function checkout() {
        // Récupération du client_secret pour le paiement.
        fetch(process.env.REACT_APP_URL_BACKEND + '/payment/pay', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount: totalAmount * 100, // En centimes, donc on multiplie par 100.
            })
        })
            .then(response => response.json())
            .then(data => {
                setStripeOptions({
                    clientSecret: data.client_secret,
                    appearance: {
                        'theme': 'flat'
                    }
                });
                setIsCheckout(true);
            });
    }

    function addToCart(plate) {
        // No need to care about new adding. If quantity is at 0, we must add it from ProductsList screen.
        let indexPlate = cart.findIndex(plateInCart => plateInCart.id === plate.id);
        let cartCopy = cloneDeep(cart);
        cartCopy[indexPlate].quantity++;
        updateCart(cartCopy);
    }

    function removeFromCart(plate) { // TODO : Externaliser la fonction
        const indexPlateToRemove = cart.findIndex(plateElement => plateElement.id === plate.id);
        if (cart[indexPlateToRemove].quantity === 1) {
            let cartCopy = [...cart];
            cartCopy.splice(indexPlateToRemove, 1);
            updateCart(cartCopy)
        } else {
            let cartCopy = cloneDeep(cart);
            cartCopy[indexPlateToRemove].quantity--;
            updateCart(cartCopy);
        }
    }

    return (
        <Menu
            customBurgerIcon={false}
            isOpen={ctx.isMenuOpen}
            width={'100%'}
            className={"my-menu"}
            onStateChange={(state) => ctx.stateChangeHandler(state)}
        >
            <>
                <h1 className={"mb-5"}>Mes commandes</h1>

                {formattedCart().map((type, idx) => {
                        return (
                            <div className={"mb-5"} key={idx}>
                                <h2>{type.name}</h2>
                                    {type.items.map((item, idx) => {
                                        return (
                                            <div className="grid grid-cols-12 mb-5" key={idx}>
                                                <div className="col-span-3">
                                                    <img src="https://picsum.photos/id/1005/400/250" alt="aléatoire"
                                                         className="w-full"/>
                                                </div>
                                                <div className="col-span-3">{item.name}</div>
                                                <div className="col-span-4 text-orange-600 font-bold">
                                                    <button onClick={() => removeFromCart(item)}
                                                            className="rounded-full bg-orange-600 w-8 h-8 text-white mr-3 text-lg">
                                                        -
                                                    </button>
                                                    {item.quantity}
                                                    <button onClick={() => addToCart(item)}
                                                            className="rounded-full bg-orange-600 w-8 h-8 text-white mr-3 text-lg">
                                                        +
                                                    </button>
                                                </div>
                                                <div className="col-span-2">{item.price * item.quantity}</div>
                                            </div>
                                        )
                                    })}
                            </div>
                        )
                    }
                )}

                <h2>Autres commandes à votre table : </h2>
                {props.otherCart.map((user) => {
                    return (
                        <div className={"mb-5"} key={user.email}>
                            <h2>{user.email}</h2>
                            {user.cart.map((plate) => {
                                return (
                                    <div>
                                        <p>{plate.name}</p>
                                        <p>{plate.quantity}</p>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}

                {formattedCart().length !== 0 && isCheckout !== true ?
                    <Button classStyle={'mr-3 btn-success'}
                            onClick={checkout}>
                            <span
                                className="mr-5">Payer {cart.reduce((partialSum, a) => partialSum + parseFloat(a.price) * a.quantity, 0)}€ </span><MdOutlinePayment/>
                    </Button> :
                    <div>
                        Du coup vous êtes plutot 🍝 ou 🍕 ?
                    </div>
                }
                {isCheckout === true ?
                    <Elements stripe={stripePromise} options={stripeOptions}>
                        <CheckoutForm clientSecret={stripeOptions.clientSecret}/>
                    </Elements>
                    : ""}
                <Button classStyle={'btn-outline btn-error'}
                        onClick={ctx.toggleMenu}>
                    <MdOutlineClose/>
                </Button>
            </>
        </Menu>
    );
};



