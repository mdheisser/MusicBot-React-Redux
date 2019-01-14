import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { FormGroup, FormControl, Form, ControlLabel, Button } from 'react-bootstrap'

export default class ProfileForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: ''
    }
  }

  handleSubmit = () => {
    const name = this.state.name
    const email = this.state.email
    this.props.submit(name, email)
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const profileID = this.props.profileID;
    return (
      <>
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
          <Button type="submit" onClick={this.handleSubmit}>
            <Link to={`/profiles/${profileID}`} onClick={this.handleSubmit}>
              See My Profile</Link></Button>
        </Form>
        <button className="spotify-button"
          onClick={this.spotifyAuth}>
          Connect to Spotify
        </button>
      </>
    )
  }
}
