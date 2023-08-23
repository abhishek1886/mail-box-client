import React from "react";

import { Container, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();
  const clickHandler = () => {
    history.push("/mails");
  };
  return (
    <Container fluid className="m-5">
      <h1>Welcome to Mail Box Client</h1>
      <Button
        variant="secondary"
        className="rounded-4 fw-bold px-4"
        onClick={clickHandler}
      >
        Let's Start!
      </Button>
    </Container>
  );
};

export default Home;
