import React, { Component } from 'react';
import { FormGroup, FormControl, Form, ControlLabel, Button } from 'react-bootstrap'

export default class ProfileForm extends Component {
  render() {
    return (
      <Form inline>
        <FormGroup controlId="formInlineName">
          <ControlLabel>Name</ControlLabel>{' '}
          <FormControl type="text" placeholder="Jane Doe" />
        </FormGroup>{' '}
        <FormGroup controlId="formInlineEmail">
          <ControlLabel>Email</ControlLabel>{' '}
          <FormControl type="email" placeholder="jane.doe@example.com" />
        </FormGroup>{' '}
        <Button type="submit">Create Profile</Button>
      </Form>
    )
  }
}
