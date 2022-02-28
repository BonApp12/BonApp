import React from "react";

function Sidebar() {

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
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="position-sticky pt-3">
                <ul className="nav flex-column">
                    {categories.map((category, index) => {
                        return (
                            <li key={index} className="nav-item">
                                <a href="/" className="nav-link">
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
        </nav>
    );
}

export default Sidebar;
