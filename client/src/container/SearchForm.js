import React, { Component } from 'react';
import Dropdown from '../presentation/Dropdown'

export default class SearchForm extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      type: ''
    }
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
    return ['album', 'artist', 'playlist', 'track'];
  }

  render() {
    return (
      <div className='row'>
        <div className="col-md-4">
          <form onSubmit={this.handleSubmit} >
            <div className="input-group">
              <div className="input-group-btn">
                <Dropdown menuItems={this.returnTypes()}
                handleSelect={this.handleTypeSelect}/>
              </div>{/* btn group */}
              <input type="text" className="form-control"
              value={this.state.searchText}
              placeholder="Search genre, artist or songs"
              onChange={this.handleSearchInput} />
            </div>{/* input group */}
            <input type="submit" value="Search"/>
          </form>
        </div>
      </div>
    )
  }
}
