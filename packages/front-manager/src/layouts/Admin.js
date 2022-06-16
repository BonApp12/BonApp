import React, {useEffect} from "react";
import {Redirect, Route, Switch, useHistory} from "react-router-dom";

// Components
import AdminNavbar from "components/Navbars/Navbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";

// Views
import Dashboard from "views/admin/Dashboard.js";
import Settings from "views/admin/Settings.js";
import Orders from "views/admin/Orders.js";
import Teams from "../views/admin/Teams";
import Plates from "../views/admin/Plates";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Logout from "../components/Logout/Logout";
import {useRecoilValue} from "recoil";
import {userAtom} from "../states/user";
import Tables from "../views/admin/Tables";

export default function Admin() {
    const userState = useRecoilValue(userAtom);
    const history = useHistory();

    useEffect(() => {
        userState === null && history.push('/');
    },[userState,history]);

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
                        <Route path="/admin/plates" exact component={Plates}/>
                        <Route path="/admin/settings" exact component={Settings}/>
                        <Route path="/admin/teams" exact component={Teams}/>
                        <Route path="/admin/tables" exact component={Tables}/>
                        <Route path="/admin/orders" exact component={Orders}/>
                        <Route path="/admin/logout" exact component={Logout}/>
                        <Redirect from="/admin" to="/admin/dashboard"/>
                    </Switch>
                    <ToastContainer/>
                </div>
            </div>
        </>
    );
}
