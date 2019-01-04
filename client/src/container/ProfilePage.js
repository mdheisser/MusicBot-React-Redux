import React, { Component } from 'react';
import { signIn } from '../actions/ProfileActions'
import { connect } from 'react-redux'


class ProfilePage extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    const profileID = this.props.profile.profileID
    const name = this.props.profileName.name;
    const email = this.props.profileName.email;
    this.props.submitProfileForm(name, email, profileID)
  }

  render() {
    let name;
    if(this.props.profileInfo.loggedIn) {
      name = this.props.profileInfo.name
    }
    return (
        <h2>Hello {name}</h2>
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
    submitProfileForm: (name, email, profileID) =>
    dispatch(signIn(name, email, profileID))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
