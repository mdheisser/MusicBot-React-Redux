import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createProfile } from '../actions/ProfileActions'

class Profile extends Component {
  getProfile = (results) => {
    //create profile in server and associate the tracks/artists with the profile
    var trackIDs = []
    var artistIDs = []
    for(const result of results) {
      var keyword = Object.keys(result)[0]
      if(keyword === 'tracks') {
        var track = result['tracks']['items'][0]
        trackIDs.push(track.id)
      } else if (keyword === 'artists') {
        var artist = result['artists']['items'][0]
        artistIDs.push(artist.id)
      }
    }
    //create new profile in db and get profile ID
    this.props.createProfile(trackIDs, artistIDs);
  }

  showInfo = () => {
    return (
      <p>Genres</p>
    )
  }

  //create profile after component mounts
  componentDidMount() {
    const results = Object.values(this.props.searchResults)
    const boundGetProfile = this.getProfile.bind(this)
    boundGetProfile(results);
  }

  render() {
    return (
      <React.Fragment>
        <h5>Your Profile:</h5>
        {this.props.profileID ? this.showInfo() : null}
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    searchResults: state.searchResults,
    profileID: state.profileID
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createProfile: (trackIDs, artistIDs) => dispatch(
      createProfile(trackIDs, artistIDs)),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
