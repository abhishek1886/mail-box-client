import React, { useEffect } from "react";

import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/layout/Header";
import SignUp from "./components/layout/inputs/SignUp";
import LogIn from "./components/layout/inputs/LogIn";
import Home from "./components/layout/Home";
import Mails from "./components/layout/Mails";
import { authActions } from "./store/auth-slice";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");

    if (email && token) {
      dispatch(authActions.login({ email, token }));
    }
  }, []);
  return (
    <React.Fragment>
      <Header />

      <main>
        <Switch>
          <Route path="/" exact>
            {!isLoggedIn && <SignUp />}
            {isLoggedIn && <Redirect to='/home' />}
          </Route>
          <Route path="/login">
            {!isLoggedIn && <LogIn />}
          </Route>
          {isLoggedIn && <Route path="/home">
            <Home />
          </Route>}
          {isLoggedIn && <Route path="/mails">
            <Mails />
          </Route>}
          <Route path="*">
            <Redirect to='/' />
          </Route>
        </Switch>
      </main>

    </React.Fragment>
  );
};

export default App;
