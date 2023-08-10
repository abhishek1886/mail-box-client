import React, { useEffect } from "react";

import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import Header from "./components/layout/Header";
import SignUp from "./components/layout/inputs/SignUp";
import LogIn from "./components/layout/inputs/LogIn";
import Home from "./components/layout/Home";
import Editor from "./components/layout/Editor";
import { authActions } from "./store/auth-slice";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');

    if(email && token){
      dispatch(authActions.login({email, token}))
    }
  }, [])
  return (
    <React.Fragment>
      <Header />
      
      <main>
        <Switch>
          <Route path='/' exact><SignUp /></Route>
          <Route path='/login'><LogIn /></Route>
          <Route path='/home'><Home /></Route>
          <Route path='/editor'><Editor /></Route>
        </Switch>

      </main>
      
    </React.Fragment>
  );
};

export default App;
