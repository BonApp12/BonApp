import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";

// Components
import Navbar from "components/Navbars/AuthNavbar.js";
import FooterAuth from "components/Footers/FooterAuth.js";

// Views
import Login from "views/auth/Login.js";

export default function Auth() {
  return (
    <>
      <Navbar transparent />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
              className="absolute top-0 w-full h-full bg-orange-300 bg-no-repeat bg-full"
              style={{
                  backgroundImage:
                      "url(" + require("assets/img/register_bg_2.png") + ")",
              }}
          />
          <Switch>
            <Route path="/auth/login" exact component={Login} />
            <Redirect from="/auth" to="/auth/login" />
          </Switch>
          <FooterAuth absolute />
        </section>
      </main>
    </>
  );
}
