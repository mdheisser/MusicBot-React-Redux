function receiveToken(authData) {
  return {
    type: 'authorize',
    token: authData.access_token
  }
}

function receiveSearch(searchData, keyProp) {
  return {
    type: 'receiveSearch',
    result: searchData,
    keyProp: keyProp
  }
}

function receiveError(error) {
  return {
    type: 'error',
    error: error
  }
}

export function storeSearch(searchResult, keyProp) {
  return {
    type: 'saveSearch',
    result: searchResult,
    keyProp: keyProp
  }
}

export function getToken() {
  return function(dispatch) {
    fetch(`/api/spotify/token`, {accept: 'application/json'})
    .then(resp => resp.json()).then(
      json => dispatch(receiveToken(json))).catch(
        error => dispatch(receiveError(error.body)))
  }
}
