import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Jumbotron, ListGroup, ListGroupItem, Button } from 'react-bootstrap'
import { storeSearch, saveSearch } from '../actions/SearchActions'


class Criteria extends Component {
  constructor() {
    super();
    this.state = {
      render: false,
      saved: false,
      searchResults: {},
      error: ''
    }
  }

  //https://developer.mozilla.org/en-US/docs/Web/API/AbortController
  controller = new AbortController();

  componentDidUpdate() {
    if(!this.state.saved) {
      const searchData = this.props.searchData
      fetch(`/api/spotify/search?q=${searchData.text}&type=${searchData.type}`,
      {signal: this.controller.signal})
      .then(resp => resp.json()).then(json =>
        this.setState({
          searchResults: json,
          render: true
        }))
        .catch(error => this.setState({
          error: error.body
      }))
    }
  }

  componentWillUnmount() {
    this.controller.abort();
  }

  //organize data into desirable format according to search type
  returnItems = (result) => {
    let info = Object.values(result)[0]['items']
    if (Object.keys(result)[0] === 'artists') {
      return info.map(artist => this.returnItemObject('artist', artist))
    } else if (Object.keys(result)[0] === 'tracks') {
      return info.map(track => this.returnItemObject('track', track))
    }
  }

  returnItemObject = (key, item) => {
    if(key === 'artist') {
      return ({
        imgURL: item.images.length > 0 ? item.images.slice(-1)[0].url : null,
        name: item.name,
        popularity: item.popularity,
        genres: item.genres.join(', '),
        spotifyID: item.id
      })
    } else if (key === 'track') {
      return {
        imgURL: item.album.images.length > 0 ? item.album.images.slice(-1)[0].url : null,
        name: item.name,
        artist: item.artists[0].name,
        popularity: item.popularity,
        spotifyID: item.id
      }
    } else {
      return null;
    }
  }

  itemList = (item) => {
    let copy = item;
    return (
      <button id={copy.spotifyID} onClick={this.selectListItem} className="list-group-item">
        {delete copy.spotifyID}
        {Object.keys(copy).map(key =>
          key !== 'imgURL' ? <span>{key} - {copy[key]} &nbsp;</span> : <img src={copy[key]} height="42" width="42" />
        )}
      </button>
    )
  }

  renderItemList = (result) => {
    const items = this.returnItems(result)
    return(items.map((item) => this.itemList(item)))
  }

  //save selected search to store
  selectListItem = (e) => {
    let result;
    let spotifyID;
    e.target.tagName !== 'BUTTON' ? spotifyID = e.target.parentElement.id : spotifyID = e.target.id;
    let results = this.state.searchResults;
    result = Object.values(results)[0].items.filter(result => result.id === spotifyID)[0]
    this.props.saveSearch(result, this.props.searchData.type)
    this.props.storeSearch(result)
    this.setState({
      saved: true
    })
  }

  renderResult = (result) => {
    if(Object.values(result)[0].items.length !== 0) {
      return (
        <div className="list-group">
          {this.renderItemList(result)}
        </div>
      )
    } else {
      return null;
    }
  }

  render() {
    let renderedResult;
    if(this.state.render && !this.state.saved) {
      renderedResult = this.renderResult(this.state.searchResults)
    } else if (this.state.saved) {
      let result = this.props.searchResults
      renderedResult = this.itemList(
        this.returnItemObject(
          this.props.category, this.props.searchResults
        ))
    } else {
      renderedResult = null
    }
    return (
      <Jumbotron>
        {renderedResult}
      </Jumbotron>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    searchResults: state.searchResults,
    category: state.searchCategory
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveSearch: (searchResult, type) =>
      dispatch(saveSearch(searchResult, type)),
    storeSearch: (searchResult) => dispatch(storeSearch(searchResult))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Criteria);
