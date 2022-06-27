import React from "react";
import {Sliding} from "../Sliding/Sliding";
import {ButtonCart} from "../ButtonCart/ButtonCart";

const Layout = (props) => {
    return (
        <div>
            <h2 className="mt-5">Bienvenue chez {props?.restaurant?.name}</h2>
            <ButtonCart/>
            <Sliding otherCart={props?.otherCart}/>
            {props.children}
        </div>
    )
};

export default Layout;
