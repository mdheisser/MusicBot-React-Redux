import React from 'react';
import { Panel } from 'react-bootstrap'

const WelcomePanel = () => {
  return (
    <Panel>
      <Panel.Heading>
        <h2>Welcome to My Smart Track!</h2>
      </Panel.Heading>
      <Panel.Body>
        Tell me which artist or song is on your mind today, and we will recommend something else to you!
      </Panel.Body>
    </Panel>
  )
}

export default WelcomePanel;
