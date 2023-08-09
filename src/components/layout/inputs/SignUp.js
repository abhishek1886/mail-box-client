import React, { useState } from "react";

import { Form, Button } from "react-bootstrap";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

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
      if (inputData.password !== inputData.confirmPassword) {
        alert("please set correct password");
      } else {
        const res = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDH9plc7T7h6CQDIKTBp6HCF-nBjgzPDHg`,
          {
            method: "POST",
            body: JSON.stringify(inputData),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (res.ok) {
          // history.replace('/login');
          setFormData({
            email: "",
            password: "",
            confirmPassword: "",
          });
        } else {
          const data = await res.json();
          let errorMessage = "Something went wrong! Try again."
          if(data && data.error && data.error.message){
            errorMessage = data.error.message;
            
          }
          throw new Error(errorMessage);
        }
      }
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <React.Fragment>
      <h2 className="py-3 text-center">Sign Up</h2>
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
        <Form.Floating className="mb-2">
          <Form.Control
            id="confirmPassword"
            type="password"
            placeholder="confrimPassword"
            name="confirmPassword"
            onChange={inputFormHandler}
            value={formData.confirmPassword}
            required
          />
          <label htmlFor="confirmPassword">Confrim Password</label>
        </Form.Floating>
        <div className="text-center my-3" >
          <Button type="submit" variant="info">Sign Up</Button>
        </div>
      </Form>
    </React.Fragment>
  );
};

export default SignUp;
