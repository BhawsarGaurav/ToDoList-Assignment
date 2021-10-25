import React, { Component } from "react";
import Button from "react-bootstrap/button";
import { Container } from "react-bootstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";
import UserDashboard from "./UserDashboard";
import { Form, Col, Row } from "react-bootstrap";
const regForName = RegExp("[a-zA-Z][a-zA-Z ]*");
const regForEmail = RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$");
const regForNumber = RegExp("^[6-9][0-9]{9}$");
const regForAge = RegExp("^[0-9]");
const regForpassword = RegExp("^[a-zA-Z0-9]{8}$");

 class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: null,
      contact: null,
      email: null,
      city: null,
      age: null,
      password: null,
      conPassword: null,
      errors: {
        firstname: " ",
        contact: " ",
        email: " ",
        city: " ",
        age: "",
        password: "",
        conPassword: "",
      },
      flag: false,
    };
  }
  handler = (event) => {
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "firstname":
        errors.firstname = regForName.test(value)
          ? ""
          : "Invalid Name, Use Character Only";
        break;

      case "contact":
        errors.contact = regForNumber.test(value)
          ? ""
          : "Invalid Contact Number, Write 10 digit contact number";
        break;

      case "email":
        errors.email = regForEmail.test(value) ? "" : "Invalid Email-Id";
        break;

      case "city":
        errors.city = regForName.test(value)
          ? ""
          : "Invalid City Name, Use Character Only";
        break;
      case "age":
        errors.age = regForAge.test(value) && value > 18 ? "" : "Invalid age";
        break;

      case "password":
        errors.password=regForpassword.test(value)
        ? ""
        : "Minmum Length should be 8";
        this.setState({password: value})
        break;

      case "conPassword":
        errors.conPassword=value===this.state.password
        ? ""
        : "Password Not Match";
        break;
    }
    this.setState({ errors, [name]: value }, () => {
      console.log(errors);
    });
  };
  formSubmit = (event) => {
    event.preventDefault();
    if (this.validate(this.state.errors)) {
      alert("Submitted");
      let formData = {
        ename: document.getElementById("ename").value,
        email: document.getElementById("email").value,
        mobile: document.getElementById("mobile").value,
        city: document.getElementById("city").value,
        password: document.getElementById("password").value,
      };

      axios.post("http://localhost:3000/employee", formData);
      this.setState({ flag: true });
      
    } else {
      alert("Invalid form");
    }
  };
  validate = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };
  render() {
    const { errors } = this.state;
    const flag = this.state.flag;
    return (
      <>
        {flag ? (
          <Redirect to="/" />
        ) : (
          <Container
            className="m-5 "
            style={{ border: "solid 1px grey", padding: "20px" }}
          >
            <h2 className="justify-content-center">Register Here</h2>
            <Form method="POST" onSubmit={this.formSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstname"
                    id="ename"
                    placeholder="Enter your first name"
                    className="form-control"
                    onBlur={this.handler}
                  />
                  {errors.firstname.length > 0 && (
                    <span style={{ color: "red" }}>{errors.firstname}</span>
                  )}
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your Email-id"
                    className="form-control"
                    onBlur={this.handler}
                  />
                  {errors.email.length > 0 && (
                    <span style={{ color: "red" }}>{errors.email}</span>
                  )}
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name="password"
                    type="text"
                    id="password"
                    placeholder="Password"
                    onBlur={this.handler}
                    
                  />
                   {errors.password.length > 0 && (
                    <span style={{ color: "red" }}>{errors.password}</span>
                  )}
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    name="conPassword"
                    type="password"
                    id="conPassword"
                    placeholder="Confirm Password"
                    onBlur={this.handler}
                  />
                   {errors.conPassword.length > 0 && (
                    <span style={{ color: "red" }}>{errors.conPassword}</span>
                  )}
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    id="city"
                    placeholder="Enter your city"
                    className="form-control"
                    onBlur={this.handler}
                  />
                  {errors.city.length > 0 && (
                    <span style={{ color: "red" }}>{errors.city}</span>
                  )}
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Mobile No.</Form.Label>
                  <Form.Control
                    type="number"
                    name="contact"
                    id="mobile"
                    placeholder="Enter your 10 digit contact number"
                    className="form-control"
                    onBlur={this.handler}
                  />
                  {errors.contact.length > 0 && (
                    <span style={{ color: "red" }}>{errors.contact}</span>
                  )}
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="number"
                    name="age"
                    id="age"
                    placeholder="Enter your age, if you are less than 18, not applicable to submit form"
                    className="form-control"
                    onBlur={this.handler}
                  />
                  {errors.age.length > 0 && (
                    <span style={{ color: "red" }}>{errors.age}</span>
                  )}
                </Form.Group>
              </Row>

              <Button variant="primary" type="submit">
                Register
              </Button>
            </Form>
          </Container>
        )}
      </>
    );
  }
}
export default Registration;
