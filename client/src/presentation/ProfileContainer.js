import React from 'react';
import { Jumbotron, Row } from 'react-bootstrap'
import Profile from '../container/Profile'

function ProfileContainer (props) {
  return (
    <React.Fragment>
      <Row>
        {props.profile ?
          <Jumbotron><Profile /></Jumbotron> : null}
      </Row>
    </React.Fragment>
  )
}

export default ProfileContainer
