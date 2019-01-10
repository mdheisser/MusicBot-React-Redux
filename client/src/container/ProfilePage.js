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
    const name = this.props.profileName.name;
    const email = this.props.profileName.email;
    const data = {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: name,
        email: email
      })
    }
    fetch(`/api/profiles/${profileID}/signin`, data)
    .then(resp => resp.json())
    .then(json => this.setState({
      tracks: json,
      loggedIn: true
    })).catch(() => this.setState({
      loggedIn: false
    }))
    //update store signIn status
    this.props.signIn();
  }

  renderProfile = () => {
    let name = this.props.profileName.name
    let tracks = this.state.tracks
    if (this.state.loggedIn) {
      return (
        <>
          <div className="page-header">
            <h2>Hello {name}</h2>
            <p>Your likes: </p>
          </div>
          <div className="list-group">
            {tracks.map(track =>
                <a className="list-group-item" href={track.spotify_url}
                  key={track.id}>
                  {track.name}
                </a>
            )}
          </div>
          <button className="btn btn-primary">
            <Link to="/start">Back to browsing</Link>
          </button>
        </>
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
    signIn: () => dispatch({type: 'signIn'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
