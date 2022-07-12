import {slide as Menu} from 'react-burger-menu';
import {useContext, useEffect, useState} from 'react';
import {SlidingContext} from '../../context/sliding';
import {useRecoilState} from "recoil";
import {cartAtom} from "../../states/cart";
import '../../css/cart.css';
import {Button} from "../Button/Button";
import {MdArrowBackIos, MdOutlinePayment} from "react-icons/md";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import {orderAtom} from "../../states/order";
import {useLocation} from "react-router-dom";
import dayjs from "dayjs";
import {addItemToCart, removeItemFromCart} from "../../helpers/cart";
import {createPayment} from "../../requests/payments/create";

// create a navigation component that wraps the burger menu
export const Sliding = (props) => {
    const ctx = useContext(SlidingContext);
    const [cart, updateCart] = useRecoilState(cartAtom);
    const [isCheckout, setIsCheckout] = useState(false);
    const [stripeOptions, setStripeOptions] = useState({});
    const [paymentIntentId, setPaymentIntentId] = useState("");
    const [setModalManagement] = useState({isOpen: false, data: null});
    const totalAmount = cart.reduce((partialSum, a) => partialSum + parseFloat(a.price) * a.quantity, 0);
    const [stripePromise, setStripePromise] = useState(null);
    const [tabToDisplay, setTabToDisplay] = useState("cart");
    const [orderStatus] = useRecoilState(orderAtom);
    const location = useLocation();
    const restaurantInformation = {
        idRestaurant: location.pathname.split('/')[2],
        idTable: location.pathname.split('/')[3]
    };
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
                };
            }
            if (!typesArray[item.type]['items'][item.id]) {
                typesArray[item.type]['items'][item.id] = {
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    photo: item?.photo || 'img.png'
                };
            } else {
                typesArray[item.type]['items'][item.id].quantity++;
            }
        });

        return Object.values(typesArray);
    }

    function checkout() {
        // Gathering client secret to send it to CheckoutForm
        if (!isCheckout) {
            createPayment(totalAmount)
                .then(response => response.json())
                .then(data => {
                    setStripeOptions({
                        clientSecret: data.client_secret,
                        appearance: {
                            'theme': 'flat'
                        }
                    });
                    setPaymentIntentId(data.paymentIntentId);
                    setIsCheckout(true);
                    setModalManagement({isOpen: true, data: null});
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            setModalManagement({isOpen: false, data: null});
            fetch(process.env.REACT_APP_URL_BACKEND + 'payment/update', {
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
                .then(() => {
                    setModalManagement({isOpen: true, data: null});
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    function removeFromCart(plate) {
        updateCart(removeItemFromCart(cart, plate));
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
                <section id="order-title">
                    <button
                        onClick={ctx.toggleMenu}>
                        <MdArrowBackIos/>
                    </button>
                    <h1 className={"mb-5 text-center"}>Mes commandes</h1>
                </section>
                <div className="tabs">
                    <a className={"tab tab-lifted " + (tabToDisplay === 'cart' && 'tab-active')}
                       onClick={() => (setTabToDisplay('cart'))}>Mon panier</a>
                    <a className={"tab tab-lifted " + (tabToDisplay === 'order' && 'tab-active')}
                       onClick={() => setTabToDisplay('order')}>Mes commandes</a>
                </div>
                {tabToDisplay === 'cart' &&
                <section>
                    {formattedCart().map((type, idx) => {
                            return (
                                <div className={"mb-5"} key={idx}>
                                    <h2 className="type-title">{type.name}</h2>
                                    {type.items.map((item) => {
                                        return (
                                            <div key={item.id} className="item-container">
                                                <div className="item-image-wrapper"
                                                     style={{
                                                         backgroundImage: `url(${process.env.REACT_APP_URL_BACKEND}plate/uploads/${item.photo})`
                                                     }}>
                                                </div>
                                                <div className="item-card-info-wrapper">
                                                    <div className="item-info">
                                                        <h3>{item.name}</h3>
                                                        <p className="item-price">{item.price} €</p>
                                                    </div>
                                                    <div>
                                                        <button className="handle-quantity"
                                                                onClick={() => updateCart(addItemToCart(cart, item))}>+
                                                        </button>
                                                        <p className="item-quantity">{item.quantity}</p>
                                                        <button className="handle-quantity"
                                                                onClick={() => removeFromCart(item)}>-
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        }
                    )}

                    {props.otherCart?.length > 0 && <h2>Autres commandes à votre table : </h2>}
                    {props.otherCart.map((user) => {
                        if (user.cart !== undefined && user.cart.length > 0) {
                            return (
                                <div className={"mb-5"} key={user.nickname}>
                                    <h2>{user.nickname}</h2>
                                    {user.cart.map((plate) => {
                                        return (

                                            <div key={plate.id} className="item-container">
                                                <div className="item-image-wrapper"
                                                     style={{
                                                         backgroundImage: `url(${process.env.REACT_APP_URL_BACKEND}plate/uploads/${plate.photo ?? 'img.png'})`
                                                     }}>
                                                </div>
                                                <div className="item-card-info-wrapper">
                                                    <div className="item-info">
                                                        <h3>{plate.name}</h3>
                                                        <p className="item-price">{plate.price} €</p>
                                                    </div>
                                                    <div>
                                                        <p className="item-quantity">{plate.quantity}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        }
                    })}
                </section>
                }
                {tabToDisplay === 'order' &&
                <section className="mt-5">
                    {orderStatus
                        .filter(order => {
                            return (order.restaurant?.id ?? order?.restaurantId) === restaurantInformation?.idRestaurant
                                && (order?.table?.id ?? order?.tableId) === restaurantInformation.idTable
                                && order.status !== 'completed';
                        })
                        .map((order) => {
                            return (
                                <div key={order.id} className="item-container">
                                    <div className="item-card-info-wrapper">
                                        <div className="item-info">
                                            <h3>Commande n° {order.id} </h3>
                                            <p className="item-price">{dayjs(order.created_at).format('DD/MM/YYYY hh:mm')}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </section>


                }
                <div className="cart-footer">
                    <div className="cart-footer-wrapper">
                        {formattedCart().length !== 0 && isCheckout !== true ?
                            <div className="cart-footer-wrapper-elements">
                                <h2>
                                    {totalAmount} €
                                </h2>
                                <div>
                                    <Button classStyle={'mr-3 btn-payment'}
                                            onClick={checkout}>
                                        <MdOutlinePayment/>
                                        <span className="ml-2">
                                            Payer
                                        </span>
                                    </Button>
                                </div>
                            </div>
                            : <></>
                        }
                        {isCheckout === true ?
                            <Elements stripe={stripePromise} options={stripeOptions}>
                                <CheckoutForm clientSecret={stripeOptions.clientSecret}/>
                            </Elements>
                            : <></>}
                    </div>
                </div>
            </>
        </Menu>
    );
};
