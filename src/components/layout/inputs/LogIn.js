import React, { useState } from "react";

import { Container, Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import useAuth from "../../hooks/auth-hook";

const LogIn = () => {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [authAction] = useAuth();

  const inputFormHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const inputData = { ...formData, returnSecureToken: true };
    authAction(inputData, "login");
  };

  const forgotPasswordHandler = () => {
    setIsLoginPage((prev) => !prev);
  };

  return (
    <React.Fragment>
      {isLoginPage && (
        <Container
          className="mx-5 mx-auto"
          style={{ maxWidth: "450px", marginTop: "150px" }}
        >
          <Card className="bg-secondary shadow p-3 px-4">
            <h2 className="py-3 text-center">Log In</h2>
            <Form onSubmit={submitHandler}>
              <Form.Floating className="mb-2">
                <Form.Control
                  id="email"
                  type="email"
                  placeholder="email"
                  name="email"
                  onChange={inputFormHandler}
                  value={formData.email}
                  required
                />
                <label htmlFor="email">Email</label>
              </Form.Floating>
              <Form.Floating className="mb-2">
                <Form.Control
                  id="password"
                  type="password"
                  placeholder="password"
                  name="password"
                  onChange={inputFormHandler}
                  value={formData.password}
                  required
                />
                <label htmlFor="password">Password</label>
              </Form.Floating>
              <div className="d-flex flex-column align-items-center justify-content-center gap-2  mt-2">
                <Button type="submit">Login</Button>
                <Button variant="border-info" onClick={forgotPasswordHandler}>
                  Forgot Password?
                </Button>
                <Link to="/">
                  <Button variant="boder-info">
                    Don't have an account? Signup
                  </Button>
                </Link>
              </div>
            </Form>
          </Card>
        </Container>
      )}
      {!isLoginPage && <ForgotPassword onClick={forgotPasswordHandler} />}
    </React.Fragment>
  );
};

export default LogIn;
