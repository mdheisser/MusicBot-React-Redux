import React, { Component } from 'react';
import Dropdown from '../presentation/Dropdown'
import Criteria from './Criteria';
import { Alert } from 'react-bootstrap'


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
    )
  }

  reshowForm = () => {
    this.setState({
      showForm: true
    })
  }

  showResult = () => {
    return(
      <Criteria searchData={this.state.search} keyProp={this.props.keyProp}
      reshowForm={this.reshowForm}/>
    )
  }

  render() {
    return (
      this.state.showForm ? this.showForm() : this.showResult()
    )
  }
}
