function receiveToken(authData) {
  return {
    type: 'authorize',
    token: authData.access_token
  }
}

function receiveSearch(searchData) {
  return {
    type: 'receiveSearch',
    result: searchData,
  }
}

function receiveError(error) {
  return {
    type: 'error',
    error: error
  }
}

export function storeSearch(searchResult) {
  return {
    type: 'saveSearch',
    result: searchResult,
  }
}
