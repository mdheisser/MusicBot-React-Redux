import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, Grid, Row, Col } from 'react-bootstrap'
import SearchContainer from './SearchContainer'
import Navbar from '../presentation/Navbar'
import ProfileContainer from '../presentation/ProfileContainer'
import WelcomePanel from '../presentation/WelcomePanel'
import { createProfile } from '../actions/ProfileActions'

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
        <div className="App">
          <Navbar />
          <div className="container-fluid">
            <Grid>
              <WelcomePanel />
              <SearchContainer />
                <Row>
                  <Button bsStyle="primary" bsSize="large" block
                    onClick={this.getProfile}>
                    Get My Track
                  </Button>
                </Row>
              <ProfileContainer profile={this.props.profile.showProfile} />
            </Grid>
          </div>
        </div>
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
