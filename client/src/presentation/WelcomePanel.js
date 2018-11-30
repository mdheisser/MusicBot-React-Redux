import React from 'react';
import { Panel } from 'react-bootstrap'

const WelcomePanel = () => {
  return (
    <Panel>
      <Panel.Heading>
        <h2>Welcome to My Music Profiler!</h2>
      </Panel.Heading>
      <Panel.Body>
        Tell me two of your favorite artist, song or album in the below section and generate your personal music profile.
      </Panel.Body>
    </Panel>
  )
}

export default WelcomePanel;
