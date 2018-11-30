import React, { Component } from 'react';
import { connect } from 'react-redux'

class Profile extends Component {
  getAudioFeature = (trackID) => {

  }

  getInfo = () => {
    const results = Object.values(this.props.searchResults)
    for(const result of results) {
      var keyword = Object.keys(result)[0]
      if(keyword === 'tracks') {
        var track = result['tracks']['items'][0]
        var trackID = track.id
        this.getAudioFeature(trackID)
      } else if (keyword === 'artists') {
        var artist = result['artists']['items'][0]
        var genres = artist.genres
        var popularity = artist.popularity
        var artist_name = artist.name
      }
    }
  }

  render() {
    return (
      <p>Song</p>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    searchResults: state.searchResults,
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Profile)
