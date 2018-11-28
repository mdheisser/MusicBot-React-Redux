import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchSearch, getToken } from '../actions/SearchActions'

import Dropdown from '../presentation/Dropdown'

class SearchForm extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      type: '',
      auth: ''
    }
  }

  componentDidMount() {
    this.setState({
      auth: this.props.auth
    })
  }

  handleSearchInput = (event) => {
    this.setState({
      text: event.target.value
    })
  }

  handleTypeSelect = (event) => {
    this.setState({
      type: event.target.innerHTML
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.search(this.state);
  }

  returnTypes() {
    return ['album', 'artist', 'track'];
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} >
        <div className="input-group">
          <Dropdown menuItems={this.returnTypes()}
          handleSelect={this.handleTypeSelect}/>
        <input type="text"
          value={this.state.searchText}
          placeholder="Keywords"
          onChange={this.handleSearchInput} />
          <input type="submit" value="Add Criteria" />
        </div>{/* input group */}
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    searchResults: state.searchResults
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    search: (searchData) => dispatch(fetchSearch(searchData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm)
