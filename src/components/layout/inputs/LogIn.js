import React, { useState } from "react";

import { Container, Card, Form, Button } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../../store/auth-slice";
import ForgotPassword from "./ForgotPassword";

const LogIn = () => {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const history = useHistory();
  const dispatch = useDispatch();

  const inputFormHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();

      const inputData = { ...formData, returnSecureToken: true };

      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDH9plc7T7h6CQDIKTBp6HCF-nBjgzPDHg`,
        {
          method: "POST",
          body: JSON.stringify(inputData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        const data = await res.json();        
        dispatch(authActions.login({ token: data.idToken, email: data.email}))
        history.push("/home");
        setFormData({
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        const data = await res.json();
        let errorMessage = "Something went wrong! Try again.";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const forgotPasswordHandler = () => {setIsLoginPage(prev => !prev)};

  return (
    <React.Fragment>
      {isLoginPage && <Container
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
                <Button variant="border-info" onClick={forgotPasswordHandler}>Forgot Password?</Button>
                <Link to="/">
                  <Button variant="boder-info">
                    Don't have an account? Signup
                  </Button>
                </Link>
              </div>
        </Form>
      </Card>
    </Container>}
    {!isLoginPage && <ForgotPassword onClick={forgotPasswordHandler} />}
    </React.Fragment>
    
  );
};

export default LogIn;
