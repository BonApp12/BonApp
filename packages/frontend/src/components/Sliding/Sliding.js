import { slide as Menu } from 'react-burger-menu';
import React, { useContext } from 'react';
import { SlidingContext } from '../../context/sliding';
import CartImage from "../../img/cart-logo.png"

// create a button that calls a context function to set a new open state when clicked
export const Button = () => {
    const ctx = useContext(SlidingContext)
    return (
        <button onClick={ctx.toggleMenu} className="float-right">
            <img alt="caddie" src={CartImage} height="50" width="50"/>
        </button>

    )
}

// create a navigation component that wraps the burger menu
export const Navigation = () => {
    const ctx = useContext(SlidingContext)

    return (
        <Menu
            customBurgerIcon={false}
            isOpen={ctx.isMenuOpen}
            onStateChange={(state) => ctx.stateChangeHandler(state)}
        >
            <h3>REMPLACER PAR LES COMMANDES.</h3>
            <h3>Contenu</h3>
            <h3>Contenu</h3>
        </Menu>
    )
}
