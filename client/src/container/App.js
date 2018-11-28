import React, { Component } from 'react';
import { connect } from 'react-redux'

import SearchForm from './SearchForm'
import Navbar from '../presentation/Navbar'
import SearchCard from '../presentation/SearchCard'
import { fetchSearch, getToken } from '../actions/SearchActions'

class App extends Component {

  //get auth token after component mounts
  componentDidMount() {
    this.props.getToken()
  }


  render() {
    return (
      <div className="App">
        <Navbar />
        <SearchCard />
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
