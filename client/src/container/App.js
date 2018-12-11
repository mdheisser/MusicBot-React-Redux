import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Button, Grid, Row, Col } from 'react-bootstrap'
import SearchContainer from './SearchContainer'
import Navbar from '../presentation/Navbar'
import ProfileContainer from '../presentation/ProfileContainer'
import Welcome from '../presentation/WelcomePanel'
import { createProfile } from '../actions/ProfileActions'
import '../css/App.css'

class App extends Component {
  constructor() {
    super();
    this.state = {
      renderSearch: true
    }
  }

  getProfile = () => {
    const result = this.props.searchResults
    var trackIDs = []
    var artistIDs = []
    var keyword = Object.keys(result)[0]
    if(keyword === 'tracks') {
      var track = result['tracks']['items'][0]
      trackIDs.push(track.id)
    } else if (keyword === 'artists') {
      var artist = result['artists']['items'][0]
      artistIDs.push(artist.id)
    }
    //create new profile in db and get profile ID
    this.props.createProfile(trackIDs, artistIDs);
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" render={Welcome} />
          <div className="container-fluid">
            <Grid>
              <Route exact path="/start" render={
                  routeProps => <SearchContainer {...routeProps}
                  getProfile={this.getProfile} />}/>
                <Route exact path="/recommend" render={routeProps =>
                    <ProfileContainer {...routeProps}
                    profile={this.props.profile.showProfile} />} />
            </Grid>
          </div>
        </div>
      </Router>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchResults: state.searchResults,
    profile: state.profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createProfile: (trackIDs, artistIDs) => dispatch(
      createProfile(trackIDs, artistIDs))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
