import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Panel, Jumbotron, Grid, Row, Col } from 'react-bootstrap'
import SearchContainer from './SearchContainer'
import Navbar from '../presentation/Navbar'
import ProfileContainer from '../presentation/ProfileContainer'
import WelcomePanel from '../presentation/WelcomePanel'
import { fetchSearch, getToken } from '../actions/SearchActions'

class App extends Component {
  constructor() {
    super();
    this.state = {
      renderSearch: {
        'form-1': true,
        'form-2': true,
      },
      showProfile: false
    }
  }
  //get auth token after component mounts
  componentDidMount() {
    this.props.getToken()
  }

  showProfile = () => {
    this.setState({
      showProfile: true
    })
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container-fluid">
          <Grid>
            <WelcomePanel />
            <Row className="show-grid">
              <Col xs={6} md={6}>
                <Jumbotron>
                  <SearchContainer keyProp='form-1' />
                </Jumbotron>
              </Col>
              <Col xs={6} md={6}>
                <Jumbotron>
                  <SearchContainer keyProp='form-2' />
                </Jumbotron>
              </Col>
            </Row>
            <ProfileContainer showProfile={this.showProfile}
            profile={this.state.showProfile}/>
          </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    searchResults: state.searchResults
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getToken: () => dispatch(getToken()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
