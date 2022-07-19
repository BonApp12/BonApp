import React from "react";
import {Link} from "react-router-dom";
import UserDropdown from "components/Dropdowns/UserDropdown.js";

export default function Sidebar() {
    const [collapseShow, setCollapseShow] = React.useState("hidden");
    return (
        <>
            <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap
      md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
                <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center
        justify-between w-full mx-auto">
                    {/* Toggle */}
                    <button
                        className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent
            rounded border border-solid border-transparent"
                        type="button"
                        onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
                    >
                        <i className="fas fa-bars"/>
                    </button>
                    {/* Brand */}
                    <Link
                        className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap
            text-sm uppercase font-bold p-4 px-0"
                        to="/"
                    >
                        BonApp
                    </Link>
                    {/* User */}
                    <ul className="md:hidden items-center flex flex-wrap list-none">
                        <li className="inline-block relative">
                            <UserDropdown/>
                        </li>
                    </ul>
                    {/* Collapse */}
                    <div
                        className={
                            "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow " +
                            "absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 " +
                            "rounded " +
                            collapseShow
                        }
                    >
                        {/* Collapse header */}
                        <div
                            className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
                            <div className="flex flex-wrap">
                                <div className="w-6/12">
                                    <Link
                                        className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap
                    text-sm uppercase font-bold p-4 px-0"
                                        to="/"
                                    >
                                        BonApp
                                    </Link>
                                </div>
                                <div className="w-6/12 flex justify-end">
                                    <button
                                        type="button"
                                        className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none
                    bg-transparent rounded border border-solid border-transparent"
                                        onClick={() => setCollapseShow("hidden")}
                                    >
                                        <i className="fas fa-times"/>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <hr className="my-4 md:min-w-full"/>
                        {/* Navigation */}

                        <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                            <li className="items-center">
                                <Link
                                    className={
                                        "text-xs uppercase py-3 font-bold block " +
                                        (window.location.href.indexOf("/admin/dashboard") !== -1
                                            ? "text-lightBlue-500 hover:text-lightBlue-600"
                                            : "text-blueGray-700 hover:text-blueGray-500")
                                    }
                                    to="/admin/dashboard"
                                >
                                    <i
                                        className={
                                            "fas fa-tv mr-2 text-sm " +
                                            (window.location.href.indexOf("/admin/dashboard") !== -1
                                                ? "opacity-75"
                                                : "text-blueGray-300")
                                        }
                                    />{" "}
                                    Dashboard
                                </Link>
                            </li>
                            <li className="items-center">
                                <Link
                                    className={
                                        "text-xs uppercase py-3 font-bold block " +
                                        (window.location.href.indexOf("/admin/tables") !== -1
                                            ? "text-lightBlue-500 hover:text-lightBlue-600"
                                            : "text-blueGray-700 hover:text-blueGray-500")
                                    }
                                    to="/admin/tables"
                                >
                                    <i
                                        className={
                                            "fas fa-receipt mr-2 text-sm " +
                                            (window.location.href.indexOf("/admin/tables") !== -1
                                                ? "opacity-75"
                                                : "text-blueGray-300")
                                        }
                                    />{" "}
                                    Tables
                                </Link>
                            </li>
                            <li className="items-center">
                                <Link
                                    className={
                                        "text-xs uppercase py-3 font-bold block " +
                                        (window.location.href.indexOf("/admin/plates") !== -1
                                            ? "text-lightBlue-500 hover:text-lightBlue-600"
                                            : "text-blueGray-700 hover:text-blueGray-500")
                                    }
                                    to="/admin/plates"
                                >
                                    <i
                                        className={
                                            "fas fa-hamburger mr-2 text-sm " +
                                            (window.location.href.indexOf("/admin/plates") !== -1
                                                ? "opacity-75"
                                                : "text-blueGray-300")
                                        }
                                    />{" "}
                                    Mes plats
                                </Link>
                            </li>
                            <li className="items-center">
                                <Link
                                    className={
                                        "text-xs uppercase py-3 font-bold block " +
                                        (window.location.href.indexOf("/admin/categories") !== -1
                                            ? "text-lightBlue-500 hover:text-lightBlue-600"
                                            : "text-blueGray-700 hover:text-blueGray-500")
                                    }
                                    to="/admin/categories"
                                >
                                    <i
                                        className={
                                            "fas fa-filter mr-2 text-sm " +
                                            (window.location.href.indexOf("/admin/categories") !== -1
                                                ? "opacity-75"
                                                : "text-blueGray-300")
                                        }
                                    />{" "}
                                    Mes catégories
                                </Link>
                            </li>
                            <li className="items-center">
                                <Link
                                    className={
                                        "text-xs uppercase py-3 font-bold block " +
                                        (window.location.href.indexOf("/admin/orders") !== -1
                                            ? "text-lightBlue-500 hover:text-lightBlue-600"
                                            : "text-blueGray-700 hover:text-blueGray-500")
                                    }
                                    to="/admin/orders"
                                >
                                    <i
                                        className={
                                            "fas fa-table mr-2 text-sm " +
                                            (window.location.href.indexOf("/admin/orders") !== -1
                                                ? "opacity-75"
                                                : "text-blueGray-300")
                                        }
                                    />{" "}
                                    Commandes
                                </Link>
                            </li>
                            <li className="items-center">
                                <Link
                                    className={
                                        "text-xs uppercase py-3 font-bold block " +
                                        (window.location.href.indexOf("/admin/teams") !== -1
                                            ? "text-lightBlue-500 hover:text-lightBlue-600"
                                            : "text-blueGray-700 hover:text-blueGray-500")
                                    }
                                    to="/admin/teams"
                                >
                                    <i
                                        className={
                                            "fas fa-user mr-2 text-sm " +
                                            (window.location.href.indexOf("/admin/teams") !== -1
                                                ? "opacity-75"
                                                : "text-blueGray-300")
                                        }
                                    />{" "}
                                    Mon équipe
                                </Link>
                            </li>
                            <li className="items-center">
                                <Link
                                    className={
                                        "text-xs uppercase py-3 font-bold block " +
                                        (window.location.href.indexOf("/admin/settings") !== -1
                                            ? "text-lightBlue-500 hover:text-lightBlue-600"
                                            : "text-blueGray-700 hover:text-blueGray-500")
                                    }
                                    to="/admin/settings"
                                >
                                    <i
                                        className={
                                            "fas fa-tools mr-2 text-sm " +
                                            (window.location.href.indexOf("/admin/settings") !== -1
                                                ? "opacity-75"
                                                : "text-blueGray-300")
                                        }
                                    />{" "}
                                    Paramètres
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
