import React from "react";
import {Button, Navigation} from "../Sliding/Sliding";
import {Link} from "react-router-dom";

const Layout = (props) => {
    return (
        <div>
            <h2 className="mt-5">Bienvenue chez {props.restaurant.name}</h2>
            <Button />
            <Navigation />
            {props.children}
        </div>
    )
}

export default Layout;