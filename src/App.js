import React from "react";

import { Route, Switch } from "react-router-dom";
import Header from "./components/layout/Header";
import SignUp from "./components/layout/inputs/SignUp";
import LogIn from "./components/layout/inputs/LogIn";
import Home from "./components/layout/Home";

const App = () => {
  return (
    <React.Fragment>
      <Header />
      
      <main>
        <Switch>
          <Route path='/' exact><SignUp /></Route>
          <Route path='/login'><LogIn /></Route>
          <Route path='/home'><Home /></Route>
        </Switch>

      </main>
      
    </React.Fragment>
  );
};

export default App;
