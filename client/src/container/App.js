import React, { Component } from 'react';
import { connect } from 'react-redux'
import ReactDOM from 'react'
import { Jumbotron, Grid, Row, Col } from 'react-bootstrap'
import SearchForm from './SearchForm'
import Navbar from '../presentation/Navbar'
import { fetchSearch, getToken } from '../actions/SearchActions'

class App extends Component {
  constructor() {
    super();
    this.state = {
      renderSearch: {
        'form-1': true,
        'form-2': true,
        'form-3': true
      }
    }
  }
  //get auth token after component mounts
  componentDidMount() {
    this.props.getToken()
  }

  removeSearch = (keyProp) => {
    if(keyProp === 'form-1') {
      this.setState({
        renderSearch: {
          ...this.state.renderSearch,
          'form-1': false
        }
      })
    } else if (keyProp === 'form-2') {
      this.setState({
        renderSearch: {
          ...this.state.renderSearch,
          'form-2': false
        }
      })
    }
  }


  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container-fluid">
          <Grid>
            <Row className="show-grid">
              <Col xs={6} md={6}>
                <Jumbotron>
                  <h4>Criteria</h4>
                  {this.state.renderSearch['form-1'] ?
                    <SearchForm keyProp='form-1' removeMe={this.removeSearch}/>
                    : null
                  }

                </Jumbotron>
              </Col>
              <Col xs={6} md={6}>
                <Jumbotron>
                  <h4>Criteria</h4>
                  {this.state.renderSearch['form-2'] ?
                    <SearchForm keyProp='form-2' removeMe={this.removeSearch}/>
                    : null
                  }
                </Jumbotron>
              </Col>
            </Row>
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
