import {AiOutlineHome, AiOutlineLogin, AiOutlineShoppingCart} from "react-icons/ai";
import React from "react";
import {NavLink, useLocation} from "react-router-dom";


export default function BottomNav() {
    const location = useLocation();
    return (
        <section className="navbar-bottom">
            <NavLink
                to="/"
            >
                <div
                    className={(location.pathname.split('/')[1] === '')
                        ? 'navbar-item active' : 'navbar-item'}
                >
                    <AiOutlineHome/>
                </div>
            </NavLink>
            {location.pathname.split('/')[1] !== '' &&
            <>
                <div className={(location.pathname.split('/')[1] === 'restaurant')
                    ? 'navbar-item active' : 'navbar-item'}
                >
                    <AiOutlineShoppingCart/>
                </div>
                <NavLink to={'profile'}>
                    <div
                        className={(window.location.pathname.split("/")[1] === 'profile')
                            ? 'navbar-item active' : 'navbar-item'}
                    >
                        <AiOutlineLogin/>
                    </div>
                </NavLink>
            </>
            }


        </section>
    );
}
