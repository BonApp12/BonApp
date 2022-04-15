import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";

// Components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";

// Views
import Dashboard from "views/admin/Dashboard.js";
import Settings from "views/admin/Settings.js";
import Tables from "views/admin/Tables.js";
import Teams from "../views/admin/Teams";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Admin() {
    return (
        <>
            <Sidebar/>
            <div className="relative md:ml-64">
                <AdminNavbar/>
                {/* Header */}
                <HeaderStats/>
                <div className="px-4 md:px-10 mx-auto w-full -m-24">
                    <Switch>
                        <Route path="/admin/dashboard" exact component={Dashboard}/>
                        <Route path="/admin/settings" exact component={Settings}/>
                        <Route path="/admin/teams" exact component={Teams}/>
                        <Route path="/admin/orders" exact component={Tables}/>
                        <Redirect from="/admin" to="/admin/dashboard"/>
                    </Switch>
                    <ToastContainer/>
                </div>
            </div>
        </>
    );
}
