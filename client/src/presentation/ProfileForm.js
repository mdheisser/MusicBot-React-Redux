import React, { Component } from 'react';
import { FormGroup, FormControl, Form, ControlLabel, Button } from 'react-bootstrap'

export default class ProfileForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: ''
    }
  }

  spotifyAuth = () => {

  }

  handleSubmit = () => {
    const name = this.state.name
    const email = this.state.email
    const profileID = this.props.profileID
    this.props.submit(name, email)
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <>
        <button onClick={this.spotifyAuth}>
          Connect with Spotify</button>
        <Form inline>
          <FormGroup controlId="formInlineName">
            <ControlLabel>Name</ControlLabel>{' '}
            <FormControl name="name"
              type="text" placeholder="Jane Doe"
              value={this.state.name} onChange={this.handleChange}/>
          </FormGroup>{' '}
          <FormGroup controlId="formInlineEmail">
            <ControlLabel>Email</ControlLabel>{' '}
            <FormControl name="email"
              type="email" placeholder="jane.doe@example.com"
              value={this.state.email} onChange={this.handleChange} />
          </FormGroup>{' '}
          <Button type="submit" onClick={this.submitForm}>
            Create Profile</Button>
        </Form>
      </>
    )
  }
}
