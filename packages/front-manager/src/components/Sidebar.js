import React from "react";

function Sidebar() {

    const user = 'MBLH';
    const title = 'Dashboard de ';

    const categorys = [
        {
            icon: 'fs-4 bi-house',
            name: 'Home'
        },
        {
            icon: 'fs-4 bi-speedometer2',
            name: 'Dashboard'
        },
        {
            icon: 'fs-4 bi-table',
            name: 'Orders'
        },
        {
            icon: 'fs-4 bi-grid',
            name: 'Products'
        },
        {
            icon: 'fs-4 bi-people',
            name: 'Customers'
        }
    ];
    return (
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-light">
            <div
                className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 min-vh-100">
                <a href="/"
                   className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-decoration-none">
                    <span className="fs-5 d-none d-sm-inline">{title}{user}</span>
                </a>
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                    id="menu">
                    {categorys.map((value, index) => {
                        return (
                            <li key={index}>
                                <a href="#" className="nav-link align-middle px-0">
                                    <i className={value.icon}/>
                                    <span className="ms-1 d-none d-sm-inline p-2">
                                        {value.name}
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
