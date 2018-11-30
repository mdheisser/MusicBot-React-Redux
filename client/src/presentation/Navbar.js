import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap'

const MusicNavbar = () =>
  <Navbar inverse collapseOnSelect>
  <Navbar.Header>
    <Navbar.Brand>
      <a href="#brand">Smart Music - Track Finder</a>
    </Navbar.Brand>
    <Navbar.Toggle />
  </Navbar.Header>
  <Navbar.Collapse>
    <Nav>
      <NavItem eventKey={1} href="#">
        Explore a song recommendation
      </NavItem>
      <NavItem eventKey={2} href="#">
        My songs
      </NavItem>
      <NavItem eventKey={2} href="#">
        My Spotify Profile
      </NavItem>
    </Nav>
    <Nav pullRight>
      <NavItem eventKey={1} href="#">
        About Us
      </NavItem>
    </Nav>
  </Navbar.Collapse>
  </Navbar>;

export default MusicNavbar;
