import Home from './Screen/Home'
import React from "react";

import {BrowserRouter as Router,Switch,Route} from "react-router-dom";



export default function BasicExample() {
  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
    </Router>
  );
}
