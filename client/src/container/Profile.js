import React, { Component } from 'react';
import { connect } from 'react-redux';
import { receiveError } from '../actions/ProfileActions'

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      showRec: false,
      rec: {}
    }
  }

  showResult = () => {
    const rec = this.state.rec
    const iframeID = rec.uri.split(':')[2]
    const iframeSRC = `https://open.spotify.com/embed/track/${iframeID}`
    return (
      <>
        <p>{rec.name}</p>
        <p>Popularity: {rec.popularity}</p>
        <p>Artist: {rec.artists[0]['name']}</p>
        <iframe src={iframeSRC}
          width='300' height='380' frameBorder='0'
          allowTransparency='true' allow='encrypted-media'>
        </iframe>
      </>
    )
  }

  // getResult = (rec) => {
  //   this.setState({
  //     showRec: true
  //   })
  //   this.showResult(rec)
  // }
  //get profile recommendation after component mounts
  componentDidMount() {
    fetch(`api/profiles/${this.props.profile.profileID}/recommendations`)
    .then(resp => resp.json())
    .then(json => this.setState({
      showRec: true,
      rec: json
    })).catch(
      error => this.props.error(error))
  }

  render() {
    return (
      <React.Fragment>
        <h5>We Recommend: </h5>
        {this.state.showRec ? this.showResult() : null}
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    searchResults: state.searchResults,
    profile: state.profile,
    recommendations: state.recommendations
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    error: (error) => dispatch(receiveError(error))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
