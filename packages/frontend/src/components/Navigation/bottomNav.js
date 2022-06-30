import {AiOutlineHome, AiOutlineScan, AiOutlineShop} from "react-icons/ai";
import React from "react";
import {NavLink, useLocation} from "react-router-dom";


export default function BottomNav() {
    const location = useLocation();
    const currentPath = location.pathname.split('/')[1];
    return (
        <section className="navbar-bottom">
            <NavLink
                to="/profile"
            >
                <div
                    className={(currentPath === 'profile')
                        ? 'navbar-item active' : 'navbar-item'}
                >
                    <AiOutlineHome/>
                </div>
            </NavLink>
            <NavLink to={'scan'}>
                <div
                    className={(currentPath === 'scan')
                        ? 'navbar-item active' : 'navbar-item'}
                >
                    <AiOutlineScan/>
                </div>
            </NavLink>
            {location.pathname.split('/')[1] !== '' &&
            <>
                <NavLink
                    to="/scan"
                >
                    <div className={(currentPath === 'restaurant')
                        ? 'navbar-item active' : 'navbar-item disable'}
                    >
                        <AiOutlineShop/>
                    </div>
                </NavLink>

            </>
            }
        </section>
    );
}
