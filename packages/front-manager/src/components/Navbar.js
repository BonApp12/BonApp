import React from "react";

function Navbar() {
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <form className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Une idée ?" aria-label="Search"/>
                    <button className="btn btn-outline-success" type="submit">Rechercher</button>
                </form>
            </div>
        </nav>
    )
}

export default Navbar;