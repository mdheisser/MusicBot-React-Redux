import React, { Component } from 'react';
import Dropdown from '../presentation/Dropdown'
import Criteria from './Criteria';
import { Row, Jumbotron, Alert, Button } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class SearchContainer extends Component {
  constructor() {
    super();
    this.state = {
      search: {
        text: '',
        type: '',
      },
      showForm: true,
      showAlert: false
    }
    this.reshowForm = this.reshowForm.bind(this)
  }

  handleSearchInput = (event) => {
    this.setState({
      ...this.state,
      search: {
        ...this.state.search,
        text: event.target.value
      }
    })
  }

  handleTypeSelect = (event) => {
    this.setState({
      ...this.state,
      search: {
        ...this.state.search,
        type: event.target.innerHTML.toLowerCase()
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if(this.state.search.type === '' || this.state.search.text === '') {
      this.setAlert();
    } else {
      this.setState({
        showForm: false
      })
    }
  }

  showAlert = () => {
    return (
      <Alert bsStyle="warning">
        Oops, you missed something
      </Alert>
    )
  }

  setAlert = () => {
    this.setState({
      showAlert: true
    })
  }

  returnTypes() {
    return ['Artist', 'Track'];
  }

  showForm = () => {
    return(
      <Row className="show-grid">
        <Jumbotron>
          <h1>Your song or artist</h1>
          <form onSubmit={this.handleSubmit} >
            <div className="input-group">
              <Dropdown menuItems={this.returnTypes()}
              handleSelect={this.handleTypeSelect}/>
            {this.state.showAlert ? this.showAlert() : null}
            <input type="text"
              value={this.searchText}
              placeholder="Keywords"
              onChange={this.handleSearchInput} />
              <input type="submit" value="Add Criteria" />
            </div>{/* input group */}
          </form>
        </Jumbotron>
      </Row>
    )
  }

  reshowForm = () => {
    this.setState({
      showForm: true
    })
  }

  showResult = () => {
    return(
      <Criteria searchData={this.state.search}
      reshowForm={this.reshowForm}/>
    )
  }

  render() {
    return (
      <div className="container-fluid">
        {this.state.showForm ? this.showForm() : this.showResult()}
        <Row>
          <button onClick={this.props.getProfile}>
            <Link to="/recommend">Get My Song</Link>
          </button>
        </Row>
      </div>
    )
  }
}
