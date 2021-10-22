
import { Container, Navbar, Nav } from "react-bootstrap";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flag: 0,
    };
  }

  LoggedOut() {
    localStorage.removeItem("employee");
    this.setState({
      flag: 1,
    });
  }
  ChangePass() {
    this.setState({
      flag: 2,
    });
  }
  render() {
    if (this.state.flag === 1) {
      return <Redirect to="/" />;
    } else if (this.state.flag === 2) {
      return <Redirect to="/changePass" />;
    }
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>TODOLISTS</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link
                style={{ marginLeft: "1100px" }}
                onClick={() => this.LoggedOut()}
              >
                LogOut
              </Nav.Link>
             
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default NavBar;
