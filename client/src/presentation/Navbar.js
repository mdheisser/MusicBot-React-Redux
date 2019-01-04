import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap'

const MusicNavbar = ({profileID}) =>
  <Navbar inverse collapseOnSelect>
  <Navbar.Header>
    <Navbar.Brand>
      <a href="/">My MusicBot</a>
    </Navbar.Brand>
    <Navbar.Toggle />
  </Navbar.Header>
  <Navbar.Collapse>
    <Nav>
      <NavItem eventKey={1} href={`/profiles/${profileID}`}>
        My Profile
      </NavItem>
      <NavItem eventKey={2} href="/start">
        Search
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
