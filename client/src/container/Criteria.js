import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Jumbotron, ListGroup, ListGroupItem, Button } from 'react-bootstrap'
import { storeSearch } from '../actions/SearchActions'


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

  componentDidUpdate() {
    const searchData = this.props.searchData
    fetch(`/api/spotify/search?q=${searchData.text}&type=${searchData.type}`)
    .then(resp => resp.json()).then(json =>
      this.setState({
        searchResults: json,
        render: true
      }))
      .catch(error => this.setState({
        error: error.body
    }))
  }

  //organize data into desirable format according to search type
  returnItems = (result) => {
    let info = Object.values(result)[0]['items']
    if (Object.keys(result)[0] === 'artists') {
      return info.map(artist => ({
        imgURL: artist.images.length > 0 ? artist.images.slice(-1)[0].url : null,
        name: artist.name,
        popularity: artist.popularity,
        genres: artist.genres.join(', '),
        spotifyID: artist.id
      }))
    } else if (Object.keys(result)[0] === 'tracks') {
      return info.map(track => ({
        imgURL: track.album.images.length > 0 ? track.album.images.slice(-1)[0].url : null,
        name: track.name,
        artist: track.artists[0].name,
        popularity: track.popularity,
        spotifyID: track.id
      })
      )
    }
  }

  renderItemList = (result) => {
    const items = this.returnItems(result)
    return(items.map((item) =>
      (
        <button id={item.spotifyID} onClick={this.selectListItem} className="list-group-item">
          {delete item.spotifyID}
          {Object.keys(item).map(key =>
            key !== 'imgURL' ? <span>{key} - {item[key]} &nbsp;</span> : <img src={item[key]} height="42" width="42" />
          )}
        </button>
      )
    ))
  }

  selectListItem = (e) => {
    let result;
    const spotifyID = e.target.parentElement.id;
    let results = this.state.searchResults;
    result = Object.values(results)[0].items.filter(result => result.id === spotifyID)[0]
    this.props.saveSearch(result)
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
      renderedResult = this.renderItemList(this.props.searchResults)
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
    searchResults: state.searchResults
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveSearch: (searchResult) =>
      dispatch(storeSearch(searchResult))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Criteria);
