import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { receiveError, saveLike, saveProfileInfo } from '../actions/ProfileActions'
import ProfileForm from '../presentation/ProfileForm'
import Recommendation from '../presentation/Recommendation'

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
    let iframeID;
    if(rec) {iframeID = rec.uri.split(':')[2]}
    const iframeSRC = `https://open.spotify.com/embed/track/${iframeID}`
    return (
      <Recommendation rec={rec} showNextTrack={this.showNextTrack}
        showPreviousTrack={this.showPreviousTrack}
        saveLike={this.saveLike} iframeSRC={iframeSRC} />
    )
  }

  //increase recIndex or fetch more recommendations
  showNextTrack = () => {
    if(this.state.recIndex < 9) {
      this.setState({
        recIndex: this.state.recIndex + 1
      })
    } else {
      this.fetchRecommend()
    }
  }

  //decrease recIndex
  showPreviousTrack = () => {
    if(this.state.recIndex > 0) {
      this.setState({
        recIndex: this.state.recIndex - 1
      })
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
    const trackSpotifyID = this.state.rec[this.state.recIndex].id
    this.props.like(trackSpotifyID, this.props.profile.profileID)
    if(!this.props.loggedIn) {
      this.setState({
        showForm: true
      })
    }
  }

  fetchRecommend = () => {
    fetch(`/api/profiles/${this.props.profile.profileID}/recommendations`,
    {method: 'POST'})
    .then(resp => resp.json())
    .then(json => this.handleFetch(json)).catch(
      error => this.props.error(error))
  }

  submitSignIn = (name, email) => {
    this.props.saveProfile(name, email)
    this.setState({
      showForm: false,
      loggedIn: true
    })
  }

  //get profile recommendation after component mounts
  //change state's showRec to true after profile is created
  //save recommended track to db
  componentDidMount() {
    this.fetchRecommend();
  }


  render() {
    let profile;
    let profileID = this.props.profile.profileID
    if(this.state.showForm && !this.state.loggedIn) {
      profile = <ProfileForm submit={this.submitSignIn} profileID={profileID}/>
    } else {
      profile = null
    }
    return (
      <React.Fragment>
        <h4>Your tracks based on {this.props.searchResults.name}:</h4>
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
    loggedIn: state.profileInfo.loggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    error: (error) => dispatch(receiveError(error)),
    like: (trackID, profileID) => dispatch(saveLike(trackID, profileID)),
    saveProfile: (name, email) => dispatch(saveProfileInfo(name, email))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
