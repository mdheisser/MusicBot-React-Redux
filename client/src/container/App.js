import React, { Component } from 'react';
import SearchForm from './SearchForm'
import Navbar from '../presentation/Navbar'
require('dotenv').config()

const CLIENT_ID = process.env.REACT_APP_DEV_SPOTIFY_CLIENTID;
const CLIENT_SECRET = process.env.REACT_APP_DEV_SPOTIFY_CLIENTSECRET;
const REDIRECT_URI = 'http://localhost:3000'

class App extends Component {
  constructor() {
    super();
    this.state = {
      authorization: ''
    }
  }

  //get authorization token after component mounts
  componentDidMount() {
    fetch(`/api/spotify/token`, {accept: 'application/json'}).then(
      resp => resp.json()).then(resp => this.setState({
        authorization: resp.access_token
      }))
  }

  //search function
  handleSearch(searchState) {
    const fetchData = {
      headers: {
        'Content-Type': 'application/json',
      }
    }
    fetch(
      `https://api.spotify.com/v1/search?q=${searchState.text}&type=${searchState.type}`,
      fetchData)
    .then(resp => resp.json()).then(jsonResp => console.log(jsonResp))
    .catch(error => console.log(error))
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
