import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Navbar, Nav, NavItem } from 'react-bootstrap'

const MusicNavbar = ({profileID}) =>
  <Navbar inverse collapseOnSelect>
  <Navbar.Header>
    <Navbar.Brand>
      <Link to='/'>MusicBot</Link>
    </Navbar.Brand>
    <Navbar.Toggle />
  </Navbar.Header>
  <Navbar.Collapse>
    <Nav>
      <NavItem eventKey={1} >
        <Link to={`/profiles/${profileID}`}>My Profile</Link>
      </NavItem>
      <NavItem eventKey={1} >
        <Link to={`/start`}>Explore music</Link>
      </NavItem>
      <NavItem eventKey={2} href="#">
        Connect to Spotify
      </NavItem>
    </Nav>
    <Nav pullRight>
      <NavItem eventKey={1} href="#">
        About Me
      </NavItem>
    </Nav>
  </Navbar.Collapse>
  </Navbar>;

export default MusicNavbar;
