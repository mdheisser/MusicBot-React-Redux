import React, { Component } from 'react';
import { connect } from 'react-redux'
import ProfileList from '../presentation/ProfileList'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import '../css/profile.css'

class ProfilePage extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      tracks: [],
      artists: []
    }
  }

  componentDidMount() {
    const profileID = this.props.profile.profileID
    const name = this.props.profile.name;
    const email = this.props.profile.email;
    const data = {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: name,
        email: email,
        profile_id: profileID
      })
    }
    fetch(`/api/profiles/signin`, data)
    .then(resp => resp.json())
    .then(json => this.logInCallback(json))
    .catch(() => {
      this.setState({
        loggedIn: false
      })
    })
  }

  logInCallback = (json) => {
    this.setState({
      tracks: json.tracks,
      loggedIn: true,
      artists: json.artists
    })
    this.props.setID(json.id)
    //update redux state signIn status
    this.props.signIn();
  }

  renderProfile = () => {
    let name = this.props.profile.name
    let tracks = this.state.tracks
    let artists = this.state.artists
    if (this.state.loggedIn) {
      return (
        <>
          <div className="page-header">
            <h2>Hello {name}!</h2>
          </div>
          <div className="profile-page-container">
            <div className="profile-list songs-list">
              <p>Your songs: </p>
              <ProfileList list={tracks} />
            </div>
            <div className="profile-list artists-list">
              <p>Your artists: </p>
              <ProfileList list={artists} />
            </div>
          </div>
          <button className="btn btn-primary">
            <Link to="/start">Back to browsing</Link>
          </button>
        </>
    )} else {
      return (
        <p>Start <Link to="/start">exploring music</Link></p>
      )
    }
  }

  render() {
    return (
      <>
        {this.renderProfile()}
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    loggedIn: state.loggedIn,
    profileName: state.profileName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: () => dispatch({type: 'signIn'}),
    setID: (profileID) => dispatch(
      {type: 'signInSetID', profileID: profileID}
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
