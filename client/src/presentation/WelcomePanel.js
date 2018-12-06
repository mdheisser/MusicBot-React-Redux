import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import '../css/welcome.css'

const Welcome = () => {
  return (
    <Jumbotron bsClass="welcome-jumbo">
      <h1>Hi, I am Music Bot</h1>
      <p>
        Give me an artist or song, and I recommend you similar songs to listen to
      </p>
      <button className="start-button">
        <Link to="/start">Get Started</Link>
      </button>
    </Jumbotron>
  )
}

export default Welcome;
