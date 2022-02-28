import React from "react";

function Sidebar() {

    const user = 'MBLH';

    const categories = [
        {
            icon: 'fs-4 bi-house',
            content: 'Home'
        },
        {
            icon: 'fs-4 bi-speedometer2',
            content: 'Dashboard'
        },
        {
            icon: 'fs-4 bi-table',
            content: 'Orders'
        },
        {
            icon: 'fs-4 bi-grid',
            content: 'Products'
        },
        {
            icon: 'fs-4 bi-people',
            content: 'Customers'
        }
    ];
    return (
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-light">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 min-vh-100">
                <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-decoration-none">
                    <img src="https://www.svgrepo.com/show/113600/restaurant.svg" alt="logo" className="logo"/>
                    <span className="fs-5 d-none d-sm-inline text-dark m-3">Dashboard de {user}</span>
                </a>
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                    id="menu">
                    {categories.map((category, index) => {
                        return (
                            <li key={index}>
                                <a href="/" className="nav-link align-middle px-0">
                                    <i className={category.icon}/>
                                    <span className="ms-1 d-none d-sm-inline p-2">
                                        {category.content}
                                    </span>
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
