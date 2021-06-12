import Home from './Screen/Home'
import React from "react";

import {BrowserRouter as Router,Switch,Route} from "react-router-dom";


import { LinkedInPopUp } from 'react-linkedin-login-oauth2';
import LinkedInPage from './Screen/LinkedInPage'


export default function BasicExample() {
  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        <Route exact path="/linkedin" component={LinkedInPopUp} />
        {/* <Route path="/" component={LinkedInPage} /> */}
      </Switch>
    </Router>
  );
}
