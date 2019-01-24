import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class ProfilePage extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      tracks: []
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
        profileID: profileID
      })
    }
    fetch(`/api/profiles/signin`, data)
    .then(resp => resp.json())
    .then(json => {
      this.setState({
        tracks: json.tracks,
        loggedIn: true
      })
      this.props.setID(json.id)
    }
  ).catch(() => this.setState({
      loggedIn: false
    }))
    //update store signIn status
    this.props.signIn();
  }

  renderProfile = () => {
    let name = this.props.profile.name
    let tracks = this.state.tracks
    if (this.state.loggedIn) {
      return (
        <div className="profile-page-container">
          <div className="page-header">
            <h2>Hello {name}</h2>
            <p>Your songs: </p>
          </div>
          <div className="list-group">
            {tracks.map(track =>
                <div className="list-group-item" key={track.id}>
                  <a href={track.spotify_url}>
                    {track.name}
                  </a>
                </div>
            )}
          </div>
          <button className="btn btn-primary">
            <Link to="/start">Back to browsing</Link>
          </button>
        </div>
    )} else {
      return (
        <p>Start <Link to="/start">exploring music!</Link></p>
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
