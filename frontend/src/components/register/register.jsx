import React, { useState } from "react";
import './register.css';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import { baseUrl } from "../../api/api";

function Register() {
  const history = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password1: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const signupform = async (e) => {
    e.preventDefault();
    for (let field in formData) {
      if (formData[field] === '') {
        alert("Field cannot be blank");
        return;
      }
    }
    if (formData.password !== formData.password1) {
      alert("Password doesn't match");
      return;
    }
    if (formData.password.length < 6) {
      alert("Password must have at least 6 characters");
      return;
    }

    try {
      const response = await fetch(`${baseUrl}user-register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'username': formData.username,
          'email': formData.email,
          'password': formData.password,
        })
      });

      if (response.status === 400) {
        alert("Registration failed. Please try again.");
      } else {
        alert("Registration successful. Please login.");
        history('/login');
      }
    } catch (error) {
      console.error("Error occurred during registration:", error);
      alert("An error occurred during registration. Please try again later.");
    }
  };

  return (
    <div className="maindiv">
      <div style={{ display: 'block', width: 500, padding: 30 }}>
        <h4>Register</h4>
        <Form onSubmit={signupform}>
          <Form.Group className="py-2">
            <Form.Control type="text" name="username" placeholder="Username" onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="py-2">
            <Form.Control type="email" name="email" placeholder="Email" onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="py-2">
            <Form.Control type="password" name="password" placeholder="Password" onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="py-2">
            <Form.Control type="password" name="password1" placeholder="Confirm Password" onChange={handleInputChange} />
          </Form.Group>
          <Button variant="primary" className="my-4" type="submit">
            Submit
          </Button>
        </Form>
        <p className="text-center text-muted mt-4 mb-0">
          Already have an account? <Link to="/login" className="fw-bold text-body"><u>Login here</u></Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
