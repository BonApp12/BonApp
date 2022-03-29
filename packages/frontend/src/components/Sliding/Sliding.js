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

// create a navigation component that wraps the burger menu
export const Sliding = () => {
    const ctx = useContext(SlidingContext);
    const [cart, updateCart] = useRecoilState(cartAtom);
    const [isCheckout, setIsCheckout] = useState(false);
    const [stripeOptions, setStripeOptions] = useState({});
    const totalAmount =  cart.reduce((partialSum, a) => partialSum + parseFloat(a.price), 0);

    const stripePromise = loadStripe('pk_test_51KdcTkFhZUmq77L090zgjyIkpZQYMTiUKH42dbtO0DeoKIdeR3c4AksFg5bo55vMNjGSAl0z5wtrdUkjSJ0hULOE00Dr3meZpt');


    function formattedCart() {
        const cartMap = new Map();

        cart.forEach(plate => {

            if (!cartMap.has(plate.name)) {
                return cartMap.set(plate.name, [plate]);
            }
            return cartMap.set(plate.name, [...cartMap.get(plate.name), plate]);

        });
        return Array.from(cartMap);
    }

    function checkout() {
        console.log('Time to khalass');

        // Récupération du client_secret pour le paiement.

        fetch(process.env.REACT_APP_URL_BACKEND + '/stripe/pay', {
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
        updateCart([...cart, plate])
    }

    function removeFromCart(plate) {
        const indexPlateToRemove = cart.findIndex(plateElement => plateElement.id === plate.id);
        const copyOfCart = [...cart];
        copyOfCart.splice(indexPlateToRemove, 1);
        updateCart(copyOfCart);
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

                        {formattedCart().map((plate, index) =>
                            //Trouver un moyen d'ajouter l'index ici
                            <div className="grid grid-cols-12 mb-5" key={index}>
                                <div className="col-span-3">
                                    <img src="https://picsum.photos/id/1005/400/250" alt="photo aléatoire"
                                         className="w-full"/>
                                </div>
                                <div className="col-span-3">{plate[0]}</div>

                                <div className="col-span-4 text-orange-600 font-bold">
                                    <button onClick={() => removeFromCart(plate[1][0])}
                                            className="rounded-full bg-orange-600 w-8 h-8 text-white mr-3 text-lg"
                                    >
                                        -
                                    </button>

                                    {plate[1].length}
                                    <button onClick={() => addToCart(plate[1][0])}
                                            className="rounded-full bg-orange-600 w-8 h-8 text-white ml-3 text-lg"
                                    >
                                        +
                                    </button>
                                </div>
                                <div className="col-span-2">{plate[1][0].price * plate[1].length}€</div>

                            </div>
                        )}
                    {formattedCart().length !== 0 && isCheckout !== true ?
                        <Button classStyle={'mr-3 btn-success'}
                                onClick={checkout}>
                            <span
                                className="mr-5">Payer {cart.reduce((partialSum, a) => partialSum + parseFloat(a.price), 0)}€ </span><MdOutlinePayment/>
                        </Button>:
                        <div>
                            Du coup vous êtes plutot 🍝 ou 🍕 ?
                        </div>
                    }
                    {isCheckout === true ?
                        <Elements stripe={stripePromise} options={stripeOptions}>
                            <CheckoutForm clientSecret={stripeOptions.clientSecret} />
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



