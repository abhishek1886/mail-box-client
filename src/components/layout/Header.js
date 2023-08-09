import React from "react";

import { Navbar, Container, Button } from "react-bootstrap";

const Header = () => {
  return (
    <header>
      <Navbar bg="black" variant="dark" expand="sm">
        <Container>
          <Navbar.Brand>Mail Box Client</Navbar.Brand>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
