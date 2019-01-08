import React, { Component } from 'react';
import { connect } from 'react-redux'


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
    }))
    //update store signIn status
    this.props.signIn();
  }

  render() {
    let name, tracks = [];
    debugger;
    if(this.state.loggedIn) {
      name = this.props.profileName.name
      tracks = this.state.tracks
    }
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
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    profileInfo: state.profileInfo,
    profileName: state.profileName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: () => dispatch({type: 'signIn'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
