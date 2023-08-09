import React from "react";

import { Navbar, Container, Button, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Navbar bg="black" variant="dark" expand="sm">
        <Container>
          <Navbar.Brand as={Link} to="/home">
            Mail Box Client
          </Navbar.Brand>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
