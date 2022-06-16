import React from "react";
import UserDropdown from "components/Dropdowns/UserDropdown.js";

export default function Navbar() {

    let title = "";
    const pathname = window.location.pathname;

    if (pathname === '/admin/dashboard') title = 'dashboard';
    if (pathname === '/admin/tables') title = 'tables';
    if (pathname === '/admin/settings') title = 'paramètres';
    if (pathname === '/admin/teams') title = 'équipes';
    if (pathname === '/admin/orders') title = 'commandes';

    return (
        <>
            {/* Navbar */}
            <nav
                className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start
            flex items-center p-4">
                <div
                    className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
                    {/* Brand */}
                    <span className="text-white text-sm uppercase hidden lg:inline-block font-semibold cursor-pointer">
                        {title}
                    </span>
                    {/* User */}
                    <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
                        <UserDropdown/>
                    </ul>
                </div>
            </nav>
            {/* End Navbar */}
        </>
    );
}
