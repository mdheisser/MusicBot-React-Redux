import React, { Component } from 'react';
import { connect } from 'react-redux'
import Dropdown from '../presentation/Dropdown'
import Criteria from './Criteria';
import { Row, Jumbotron, Alert, Button } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import '../css/Search.css'
import { saveCategory } from '../actions/SearchActions'

class SearchContainer extends Component {
  constructor() {
    super();
    this.state = {
      search: {
        text: '',
        type: 'track',
      },
      showForm: true,
      showAlert: false,
      buttons: {
        artist: false,
        track: true
      }
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
      },
      buttons: {
        [event.target.name]: !this.state.buttons[event.target.name]
      }
    })
    this.props.saveCategory(event.target.name)
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
      <>
        <form>
          <div className="btn-group">
            <button type="button" name="artist"
              className={this.state.buttons.artist ? 'btn btn-default' + ' clicked' : 'btn btn-default'}
              onClick={this.handleTypeSelect}>Artist</button>
            <button type="button" name="track"
              className={this.state.buttons.track ? 'btn btn-default' + ' clicked' : 'btn btn-default'}
              onClick={this.handleTypeSelect}>Track</button>
          </div>
          {this.state.showAlert ? this.showAlert() : null}
          <div className="search-input">
            <input type="text"
              value={this.searchText}
              placeholder="Your artist or song"
              onChange={this.handleSearchInput} />
          </div>
        </form>
      </>
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
    let renderSearchResult;
    if (this.state.search.text !== "" && this.state.search.type !== "") {
      renderSearchResult = this.showResult()
    } else {
      renderSearchResult = null;
    }
    return (
      <div className="container-fluid">
        <div className="page-header">
          <h4>First, tell us your song or artist</h4>
        </div>
        {this.showForm()}
        {renderSearchResult}
        <Row>
          <button className="get-song-button" onClick={this.props.getProfile}>
            <Link to="/recommend">Get My Song</Link>
          </button>
        </Row>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveCategory: (category) => dispatch(saveCategory(category))
  }
}

export default connect(null, mapDispatchToProps)(SearchContainer)
