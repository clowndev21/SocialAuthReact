import Home from './Screen/Home'
import React from "react";

import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";

import { LinkedInPopUp } from 'react-linkedin-login-oauth2';
import LinkedInPage from './Screen/LinkedInPage'
import Checkout from './Screen/checkout'
import "./App.css";
export default function BasicExample() {
  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/checkout">
            <Checkout />
          </Route>
        <Route exact path="/linkedin" component={LinkedInPopUp} />
      </Switch>
    </Router>
  );
}
