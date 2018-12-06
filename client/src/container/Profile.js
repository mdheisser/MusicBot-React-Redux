import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { receiveError, saveLike } from '../actions/ProfileActions'
import Like from '../presentation/Like'
import { Col } from 'react-bootstrap'
import ProfileForm from '../presentation/ProfileForm'

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      showRec: false,
      rec: {},
      showForm: false
    }
  }

  //show result based on state
  showResult = () => {
    const rec = this.state.rec
    const iframeID = rec.uri.split(':')[2]
    const iframeSRC = `https://open.spotify.com/embed/track/${iframeID}`
    return (
      <>
        <Col xs={6} md={4}>
          <p>{rec.name}</p>
          <p>Popularity: {rec.popularity}</p>
          <p>Artist: {rec.artists[0]['name']}</p>
        </Col>
        <Col xs={6} md={4}>
          <iframe src={iframeSRC}
            width='300' height='380' frameBorder='0'
            allowTransparency='true' allow='encrypted-media'>
          </iframe>
        </Col>
        <Col xsHidden md={4}>
          <Like saveLike={this.saveLike} />
        </Col>
      </>
    )
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

  //get profile recommendation after component mounts
  //change state's showRec to true after profile is created
  //save recommended track to db
  componentDidMount() {
    fetch(`/api/profiles/${this.props.profile.profileID}/recommendations`,
    {method: 'POST'})
    .then(resp => resp.json())
    .then(json => this.handleFetch(json)).catch(
      error => this.props.error(error))
  }

  render() {
    return (
      <React.Fragment>
        <h5>We Recommend: </h5>
        {this.state.showRec ? this.showResult() : null}
        {this.state.showForm ? <ProfileForm /> :null}
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
