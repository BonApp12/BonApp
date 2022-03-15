import React from "react";
import {ButtonCart, Navigation} from "../Sliding/Sliding";

const Layout = (props) => {
    return (
        <div>
            <h2 className="mt-5">Bienvenue chez {props?.restaurant?.name}</h2>
            <ButtonCart/>
            <Navigation/>
            {props.children}
        </div>
    )
}

export default Layout;
