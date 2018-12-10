import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { receiveError, saveLike } from '../actions/ProfileActions'
import ProfileForm from '../presentation/ProfileForm'
import Recommendation from '../presentation/Recommendation'
import ProfilePage from '../presentation/ProfilePage'

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      showRec: false,
      rec: {},
      showForm: false,
      loggedIn: false,
      recIndex: 0
    }
  }

  //show result based on state
  showResult = () => {
    const rec = this.state.rec[this.state.recIndex]
    const iframeID = rec.uri.split(':')[2]
    const iframeSRC = `https://open.spotify.com/embed/track/${iframeID}`
    return (
      <Recommendation rec={rec} showNextTrack={this.showNextTrack}
        saveLike={this.saveLike} iframeSRC={iframeSRC} />
    )
  }

  showNextTrack = () => {
    if(this.state.recIndex < 9) {
      this.setState({
        recIndex: this.state.recIndex + 1
      })
    } else {
      this.fetchRecommend()
    }
  }

  //calls showResult()
  handleFetch = (json) => {
    this.setState({
      showRec: true,
      rec: json
    });
  }

  //after like button is clicked, save the liked track to db and associate it with the profile
  saveLike = () => {
    const trackSpotifyID = this.state.rec.id
    this.props.like(trackSpotifyID, this.props.profile.profileID)
    this.setState({
      showForm: true
    })
  }

  fetchRecommend = () => {
    fetch(`/api/profiles/${this.props.profile.profileID}/recommendations`,
    {method: 'POST'})
    .then(resp => resp.json())
    .then(json => this.handleFetch(json)).catch(
      error => this.props.error(error))
  }

  //get profile recommendation after component mounts
  //change state's showRec to true after profile is created
  //save recommended track to db
  componentDidMount() {
    this.fetchRecommend();
  }


  render() {
    let profile;
    if(this.state.showForm && !this.state.loggedIn) {
      profile = <ProfileForm />
    } else if (this.state.loggedIn) {
      profile = <ProfilePage />
    } else {
      profile = null
    }

    return (
      <React.Fragment>
        <h5>We Recommend: </h5>
        {this.state.showRec ? this.showResult() : null}
        {profile}
      </React.Fragment>
    )
  }
}
//end of profile class

const mapStateToProps = (state) => {
  return {
    searchResults: state.searchResults,
    profile: state.profile,
    likes: state.likes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    error: (error) => dispatch(receiveError(error)),
    like: (trackID, profileID) => dispatch(saveLike(trackID, profileID))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
