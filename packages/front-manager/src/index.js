import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// Styles
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/index.css";

// Layouts
import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            {/* add routes with layouts */}
            <Route path="/admin" component={Admin} />
            <Route path="/auth" component={Auth} />
            {/* add redirect for first page */}
            <Redirect from="*" to="/auth" />
        </Switch>
    </BrowserRouter>,
    document.getElementById("root")
);
