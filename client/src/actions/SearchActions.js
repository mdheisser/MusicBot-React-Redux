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
    type: 'error',
    error: error
  }
}

export function fetchSearch(searchData, auth) {
  const fetchData = {
    headers: {
      'Content-Type': 'application/json',
    }
  }
  return function(dispatch) {
    return fetch(
      `/api/spotify/search?q=${searchData.text}&type=${searchData.type}&authorization=${auth}`,
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
