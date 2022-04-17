import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/index.css";
import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";
import {RecoilRoot} from "recoil";

ReactDOM.render(
    <BrowserRouter>
        <RecoilRoot>
            <Switch>
                {/* add routes with layouts */}
                <Route path="/admin" component={Admin}/>
                <Route path="/auth" component={Auth}/>
                {/* add redirect for first page */}
                <Redirect from="*" to="/auth"/>
            </Switch>
        </RecoilRoot>
    </BrowserRouter>,
    document.getElementById("root")
);
