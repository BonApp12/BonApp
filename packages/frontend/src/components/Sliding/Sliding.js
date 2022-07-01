import {slide as Menu} from 'react-burger-menu';
import {useContext, useEffect, useState} from 'react';
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
import {Information} from "../overlay/information";

// create a navigation component that wraps the burger menu
export const Sliding = (props) => {
    const ctx = useContext(SlidingContext);
    const [cart, updateCart] = useRecoilState(cartAtom);
    const [isCheckout, setIsCheckout] = useState(false);
    const [stripeOptions, setStripeOptions] = useState({});
    const [paymentIntentId, setPaymentIntentId] = useState("");
    const [modalManagement, setModalManagement] = useState({isOpen: false, data: null});
    const totalAmount = cart.reduce((partialSum, a) => partialSum + parseFloat(a.price) * a.quantity, 0);
    const [stripePromise, setStripePromise] = useState(null);

    useEffect(() => {
        setStripePromise(loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY));
    }, []);

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
        // Gathering client secret to send it to CheckoutForm
        if (!isCheckout) {
            fetch(process.env.REACT_APP_URL_BACKEND + '/payment/create', {
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
                    setPaymentIntentId(data.paymentIntentId)
                    setIsCheckout(true);
                    setModalManagement({isOpen: true, data: null});
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
             setModalManagement( {isOpen: false, data: null });
            fetch(process.env.REACT_APP_URL_BACKEND + '/payment/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    paymentIntentId: paymentIntentId,
                    amount: totalAmount * 100,
                })
            })
                .then(response => response.json())
                .then(data => {
                    setModalManagement({isOpen: true, data: null });
                })
                .catch((error) => {
                    console.error(error);
                })
        }
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
                    if (user.cart !== undefined && user.cart.length > 0) {
                        return (
                            <div className={"mb-5"} key={user.nickname}>
                                <h2>{user.nickname}</h2>
                                {user.cart.map((plate, idx) => {
                                    return (
                                        <div className="grid grid-cols-12 mb-5" key={idx}>
                                            <div className="col-span-3">
                                                <img src="https://picsum.photos/id/1005/400/250" alt="aléatoire"
                                                     className="w-full"/>
                                            </div>
                                            <div className="col-span-3">{plate.name}</div>
                                            <div className="col-span-4 text-orange-600 font-bold">
                                                {plate.quantity}
                                            </div>
                                            <div className="col-span-2">{plate.price * plate.quantity}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    }
                })}

                {formattedCart().length === 0 &&
                    <div>
                        Du coup vous êtes plutot 🍝 ou 🍕 ?
                    </div>
                }

                {totalAmount > 0 &&
                    <Button classStyle={'mr-3 btn-success'}
                            onClick={checkout}>
                            <span
                                className="mr-5">Payer {totalAmount}€ </span><MdOutlinePayment/>
                    </Button>
                }
                {isCheckout === true ?
                    <Information displayModal={modalManagement} setDisplayModal={setModalManagement}>
                        <span className="mr-5">Montant : {totalAmount} €</span>
                        <Elements stripe={stripePromise} options={stripeOptions}>
                            <CheckoutForm clientSecret={stripeOptions.clientSecret}/>
                        </Elements>
                    </Information>
                    : ""}
                <Button classStyle={'btn-outline btn-error'}
                        onClick={ctx.toggleMenu}>
                    <MdOutlineClose/>
                </Button>
            </>
        </Menu>
    );
};



