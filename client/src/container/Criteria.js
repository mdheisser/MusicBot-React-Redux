import React, { Component } from 'react';
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap'
import { storeSearch } from '../actions/SearchActions'


class Criteria extends Component {
  constructor() {
    super();
    this.state = {
      render: false,
      searchResults: {},
      error: ''
    }
  }

  componentDidMount() {
    const searchData = this.props.searchData
    fetch(`/api/spotify/search?q=${searchData.text}&type=${searchData.type}&authorization=${this.props.auth}`)
    .then(resp => resp.json()).then(json => {
      this.setState({
        searchResults: json,
        render: true
      });
      this.props.saveSearch(json, this.props.keyProp)})
      .catch(error => this.setState({
        error: error.body
    }))
  }

  //organize data into desirable format according to search type
  returnItems = (result) => {
    let info = Object.values(result)[0]['items']
    if(info.length === 0) {
      //check if no search result
      return this.renderNone()
    } else {
      if (Object.keys(result)[0] === 'albums') {
        // if search type is album
        return {
          album_name: info[0].name,
          artist: info[0].artists[0].name,
          release_date: info[0].release_date,
        }
      } else if (Object.keys(result)[0] === 'artists') {
        return {
          artist_name: info[0].name,
          popularity: info[0].popularity,
          genres: info[0].genres.join(', ')
        }
      } else if (Object.keys(result)[0] === 'tracks') {
        return {
          track_name: info[0].name,
          artist: info[0].artists[0].name,
          release_date: info[0].release_date
        }
      }
    }
  }

  renderItemList = (result) => {
    const items = this.returnItems(result)
    return(Object.keys(items).map((key) =>
      <ListGroupItem header={key.split('_').join(' ')}>
        {items[key]}
      </ListGroupItem>
    ))
  }

  renderResult = () => {
    let result;
    result = this.state.searchResults;
    if(Object.values(result).length !== 0) {
      return (
        <ListGroup>
          {this.renderItemList(result)}
        </ListGroup>
      )
    } else {
      return (
        this.renderNone()
      )}
  }

  renderNone = () => {
    return (
      <strong>
        We can't fathom your keyword, please try again
      </strong>
    )
  }

  render() {
    return (
      <React.Fragment>
        {this.state.render ? this.renderResult() : null}
        <button bsStyle='warning'>Reset</button>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveSearch: (searchResult, keyProp) =>
      dispatch(storeSearch(searchResult, keyProp))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Criteria);