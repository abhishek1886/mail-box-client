import React, { useState, useRef } from "react";

import { Button, Form, Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/auth-hook";

const ForgotPassword = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef();
  const [authAction] = useAuth();

  const clickHandler = (e) => {
    setIsLoading(true);
    const payload = {
      requestType: "PASSWORD_RESET",
      email: inputRef.current.value,
    };
    authAction(payload, "forgotPassword");

    setIsLoading(false);
  };

  return (
    <Container
      className="my-5 mx-auto"
      style={{ maxWidth: "450px", marginTop: "100px" }}
    >
      <Card className="bg-secondary p-3 pt-5 text-center">
        <p>Enter the email with which you have registered.</p>
        <Form.Floating>
          <Form.Control
            id="email"
            type="email"
            ref={inputRef}
            placeholder="email"
            required
          />
          <label htmlFor="email">Email</label>
        </Form.Floating>
        <div className="text-center my-2 mt-3">
          {isLoading && <p>Loading...</p>}
          {!isLoading && (
            <Button variant="info" onClick={clickHandler}>
              Send Link
            </Button>
          )}
        </div>
        <p>
          Already a user?{" "}
          <Link to="/login" onClick={props.onClick}>
            LogIn
          </Link>
        </p>
      </Card>
    </Container>
  );
};

export default ForgotPassword;
