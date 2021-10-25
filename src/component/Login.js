import React, { useEffect, useState } from "react";

import { FloatingLabel, Container, Form } from "react-bootstrap";
import Button from "react-bootstrap/button";
import { Redirect, Link } from "react-router-dom";
import AxiosApi from "./AxiosApi";

function Login() {
  const [employe, setEmployee] = useState([]);

  const [condition, setCondition] = useState(1);

  useEffect(() => {
    const api = AxiosApi();
    api.get().then(function (response) {
     setEmployee(response.data);
     
   });

  }, []);

    const checkdata=()=> {
    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;
    for (const emp in employe) {
      if (employe[emp]["email"] == email && employe[emp]["password"] == pass) {
        alert("sucess");
        localStorage.setItem("employee", JSON.stringify(employe[emp]));

        setCondition(0);

        break;
      } 
    }
    if(condition)alert("check user id and password")
  }

  
  return (
    <>
      {condition ? 
        <Container
          style={{
            width: "50%",
            marginTop: "10%",
            border: "1px solid grey",
            padding: "50px",
          }}
        >
          <h1
            style={{
              color: "black",
              marginBottom: "10px",
              fontFamily: "bolder",
              textAlign: "center",
            }}
          >
            Login Page
          </h1>
          <FloatingLabel label="Email" className="mb-3">
            <Form.Control
              type="email"
              id="email"
              placeholder="name@example.com"
            />
          </FloatingLabel>
          <FloatingLabel label="Password">
            <Form.Control
              type="password"
              id="password"
              placeholder="Password"
            />
          </FloatingLabel>
          <Container style={{ textAlign: "center" }}>
            <Button
              className="mt-3"
              style={{ width: "50%" }}
              onClick={() => checkdata()}
            >
              Login
            </Button>
            <p className="mt-2">If not registerd click to Register</p>
            <Link to="/Registration">
              <Button style={{ width: "50%" }}>Register</Button>
            </Link>
          </Container>
        </Container>
       : 
        <Redirect to="/userDashboard" />
      }
    </>
  );
}

export default Login;