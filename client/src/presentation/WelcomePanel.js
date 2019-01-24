import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import '../css/welcome.css'

const Welcome = () => {
  return (
    <div className="welcome-box">
      <h1>This is MusicBot</h1>
      <p>
        Based on your favorite artist or song, it tells you what to listen to next.
      </p>
      <button className="start-button">
        <Link to="/start">Get Started</Link>
      </button>
    </div>
  )
}

export default Welcome;
