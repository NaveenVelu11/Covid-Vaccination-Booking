import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useLocation } from 'react-router-dom';
import './Nevigation.css';
import user from './download.png';

function Nevigation() {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("user_id");

  return (
    <Navbar variant="dark" expand="lg" className="custom-navbar mb-3" fixed="top">
      <Container fluid>
        <Navbar.Brand>Vaccination Slot Booking</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto nav-links" activeKey={location.pathname}>
            {isLoggedIn ? (
              <>
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                <Nav.Link href="/booked_userdetails">User Details</Nav.Link>
                <Nav.Link href="/book_slot">Book Slot</Nav.Link>
                <NavDropdown
                  title={<img src={user} alt="user" height="30px" className="user-icon" />}
                  id="collasible-nav-dropdown"
                  className="user-dropdown"
                  align="end" /* This aligns the dropdown menu to the end (right side) */
                >
                  <NavDropdown.Item href="/my_profile">My Profile</NavDropdown.Item>
                  {/* <NavDropdown.Item href="/Edit_profile">Edit Profile</NavDropdown.Item> Added */}
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
          
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Nevigation;
