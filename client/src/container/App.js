import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Button, Grid, Row, Col } from 'react-bootstrap'
import SearchContainer from './SearchContainer'
import Navbar from '../presentation/Navbar'
import ProfileContainer from '../presentation/ProfileContainer'
import Welcome from '../presentation/WelcomePanel'
import { createProfile, saveProfileInfo } from '../actions/ProfileActions'
import '../css/App.css'
import ProfilePage from './ProfilePage'
import ProfileForm from '../presentation/ProfileForm'


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
    var keyword = this.props.searchCategory
    if(keyword === 'track') {
      var track = result
      trackIDs.push(track.id)
    } else if (keyword === 'artist') {
      var artist = result
      artistIDs.push(artist.id)
    }
    //if signed in, add new like to profile and get rec
    //if not, create new profile in db and get profile ID
    this.props.createProfile(trackIDs, artistIDs);
  }

  submitSignIn = (name, email) => {
    this.props.saveProfile(name, email)
  }

  render() {
    let profileID;
    if (this.props.profile.showProfile) {
      profileID = this.props.profile.profileID
    } else {
      profileID = ""
    }
    return (
      <Router>
        <div className="App">
          <Navbar profileID={this.props.profile.profileID}
            loggedIn={this.props.loggedIn}
            signIn={this.submitSignIn}
            />
          <Route exact path="/" render={Welcome} />
          <div className="container-fluid">
            <Route exact path="/start" render={
                routeProps => <SearchContainer {...routeProps}
                getProfile={this.getProfile} />}/>
            <Route exact path="/recommend" render={routeProps =>
                <ProfileContainer {...routeProps}
                profile={this.props.profile.showProfile} />} />
            <Route exact path={`/profiles/${profileID}`}
              render={routeProps => <ProfilePage {...routeProps} />} />
            <Route exact path="/signin" render={routeProps =>
                <ProfileForm {...routeProps} profileID={profileID}
                  submit={this.submitSignIn}
                  />} />
            <Route exact path="/profiles" render={() => <Redirect to="/" />} />
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchResults: state.searchResults,
    profile: state.profile,
    loggedIn: state.loggedIn,
    searchCategory: state.searchCategory
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createProfile: (trackIDs, artistIDs) => dispatch(
      createProfile(trackIDs, artistIDs)),
    saveProfile: (name, email) => dispatch(saveProfileInfo(name, email))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
