import React, { Component } from 'react';
import SearchForm from './SearchForm'
import Navbar from '../presentation/Navbar'
require('dotenv').config()

const CLIENT_ID = process.env.REACT_APP_DEV_SPOTIFY_CLIENTID;
const CLIENT_SECRET = process.env.REACT_APP_DEV_SPOTIFY_CLIENTSECRET;

class App extends Component {
  constructor() {
    super();
    this.state = {
      authorization: ''
    }
  }

  //get authorization token after component mounts
  componentDidMount() {
    const fetchData = {
      method: 'POST',
      headers: {
        'Authorization': `Basic${CLIENT_ID}:${CLIENT_SECRET}`
      },
      body: {
        'grant_type': 'client_credentials'
      },
    }
    fetch('https://accounts.spotify.com/api/token', fetchData)
    .then(resp => resp.json()).then(jsonResp => this.setState({
      authorization: jsonResp.token_type + ' ' + jsonResp.access_token
    }))
  }

  //search function
  handleSearch(searchText) {
    const fetchData = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.state.authorization
      }
    }
    fetch(`https://api.spotify.com/v1/search?q=${searchText}`, fetchData)
    .then()
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <SearchForm token={this.state.access_token}
          search={this.handleSearch}/>
      </div>
    );
  }
}

export default App;
