import React, { useState, useContext, useEffect } from "react";
import "./Header.scss";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";

const Header = (props) => {
  const navigate = useNavigate();
  const { logout, user } = useContext(UserContext);

  const handleLogOut = () => {
    logout();
    navigate("/");
    toast.success("Log out success!!");
  };

  return (
    <div className="header">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {((user && user.auth) || window.location.pathname === "/") && (
              <>
                <Nav className="me-auto">
                  <NavLink className="nav-link" to="/">
                    Home
                  </NavLink>
                  <NavLink className="nav-link" to="/user">
                    Manage User
                  </NavLink>
                </Nav>
                <Nav>
                  {user && user.email && (
                    <span className="nav-link"> Welcome {user.email}</span>
                  )}
                  <NavDropdown title="Setting" id="basic-nav-dropdown">
                    {user && user.auth === true ? (
                      <NavDropdown.Item onClick={() => handleLogOut()}>
                        LogOut
                      </NavDropdown.Item>
                    ) : (
                      <NavLink to="/login" className="dropdown-item">
                        LogIn
                      </NavLink>
                    )}
                  </NavDropdown>
                </Nav>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
