import React from "react";

import { Navbar, Container, Button, NavLink } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { inboxActions } from "../../store/inbox-slice";
import { sentActions } from "../../store/sent-slice";

const Header = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const history = useHistory();
  const user = localStorage.getItem("email");

  const logoutHandler = () => {
    dispatch(authActions.logout());
    dispatch(inboxActions.removeItems({ type: "all" }));
    dispatch(sentActions.removeItems({ type: "all" }));
    history.replace("/");
  };

  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="sm">
        <Container>
          <Navbar.Brand as={Link} to="/home">
            Mail Box Client
          </Navbar.Brand>
          {isLoggedIn && (
            <div className="text-end">
              <Button variant="outline-secondary" onClick={logoutHandler}>
                Logout
              </Button>
              <p
                className="p-0 m-0"
                style={{ fontSize: "10px", color: "grey" }}
              >
                Signed in as: <span className="text-secondary">{user}</span>
              </p>
            </div>
          )}
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
