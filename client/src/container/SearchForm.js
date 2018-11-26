import React, { Component } from 'react';
import Dropdown from '../presentation/Dropdown'

export default class SearchForm extends Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
      type: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      searchText: event.target.value
    })
  }

  handleSelect = (event) => {
    event.preventDefault();
    this.setState({
      type: event.target.name
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.search(this.state.searchText);
  }

  returnTypes() {
    return ['album', 'artist', 'playlist', 'track'];
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} >
        <div className='row'>
          <div className="input-group">
            <Dropdown menuItems={this.returnTypes()}
            handleSelect={this.handleChange}/>
            <input type="text" className="form-control"
            value={this.state.searchText}
            placeholder="Search genre, artist or songs"
            onChange={this.handleChange} />
            <input type="submit" value="Search" />
          </div>
        </div>
        {/*input-group*/}
      </form>
    )
  }
}
