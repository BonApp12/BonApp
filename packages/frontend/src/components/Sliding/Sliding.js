import {slide as Menu} from 'react-burger-menu';
import React, {useContext} from 'react';
import {SlidingContext} from '../../context/sliding';
import {RiShoppingCart2Line} from "react-icons/ri";
import {useRecoilState} from "recoil";
import {cartAtom} from "../../states/cart";
import '../../css/cart.css'
import {Button} from "../Button/Button";
import {MdOutlineClose, MdOutlinePayment} from "react-icons/md";
// create a button that calls a context function to set a new open state when clicked
export const ButtonCart = () => {
    const [cart, updateCart] = useRecoilState(cartAtom);
    const ctx = useContext(SlidingContext)
    return (
        <button onClick={ctx.toggleMenu} className="float-right">
            <div className="bg-orange-600 text-white custom-padding">
                {cart?.length > 0 &&
                <div className="badge badge-ghost badge-cart">{cart.length}</div>
                }
                <RiShoppingCart2Line/>
            </div>
        </button>

    )
}

// create a navigation component that wraps the burger menu
export const Navigation = () => {
    const ctx = useContext(SlidingContext)
    const [cart, updateCart] = useRecoilState(cartAtom);

    function formattedCart() {
        const cartMap = new Map();

        cart.forEach(plate => {

            if (!cartMap.has(plate.name)) {
                return cartMap.set(plate.name, [plate]);
            }
            return cartMap.set(plate.name, [...cartMap.get(plate.name), plate]);

        })
        return Array.from(cartMap);
    }

    function checkout() {
        console.log('Time to khalass');
    }

    function addToCart(plate) {
        updateCart([...cart, plate])
    }

    function removeFromCart(plate) {
        const indexPLateToRemove = cart.findIndex(plateElement => plateElement.id === plate.id);
        const copyOfCart = [...cart]
        copyOfCart.splice(indexPLateToRemove, 1);
        updateCart(copyOfCart)
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

                <div className="grid grid-cols-12 mb-5">
                    {formattedCart().map((plate, index) =>
                        //Trouver un moyen d'ajouter l'index ici
                        <>
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

                        </>
                    )}
                </div>
                {formattedCart().length !== 0 ?
                    <Button classStyle={'mr-3 btn-success animate__animated animate__bounce'}
                            onClick={checkout}>
                        <span
                            className="mr-5">Payer {cart.reduce((partialSum, a) => partialSum + parseFloat(a.price), 0)}€ </span><MdOutlinePayment/>
                    </Button> :
                    <div>
                        Du coup vous êtes plutot 🍝 ou 🍕 ?
                    </div>
                }
                <Button classStyle={'btn-outline btn-error'}
                        onClick={ctx.toggleMenu}>
                    <MdOutlineClose/>
                </Button>
            </>
        </Menu>
    );
};



