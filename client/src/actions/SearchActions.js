function receiveToken(authData) {
  return {
    type: 'authorize',
    token: authData.access_token
  }
}

function receiveSearch(searchData) {
  return {
    type: 'receiveSearch',
    result: searchData
  }
}

function receiveError(error) {
  return {
    error: error
  }
}

export function fetchSearch(searchData) {
  const fetchData = {
    headers: {
      'Content-Type': 'application/json',
    }
  }
  return function(dispatch) {
    return fetch(
      `/api/spotify/search?${searchData.text}&type=${searchData.type}&authorization=${searchData.auth}`,
    fetchData).then(resp => resp.json()).then(
      json => dispatch(receiveSearch(json))).catch(
        error => dispatch(receiveError(error)))
  }
}

export function getToken() {
  return function(dispatch) {
    fetch(`/api/spotify/token`, {accept: 'application/json'})
    .then(resp => resp.json()).then(
      json => dispatch(receiveToken(json)))
  }
}
