import {useRecoilState} from "recoil";
import {cartAtom} from "../../states/cart";
import {useContext} from "react";
import {SlidingContext} from "../../context/sliding";
import {RiShoppingCart2Line} from "react-icons/ri";

export const ButtonCart = () => {
    const cart = useRecoilState(cartAtom)[0];
    const ctx = useContext(SlidingContext);
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
};
