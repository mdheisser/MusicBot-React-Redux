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

export function saveCategory(category) {
  return {
    type: 'saveCategory',
    category: category
  }
}

export function saveSearch(searchResult, type) {
  const data = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      spotifyID: searchResult.id,
      name: searchResult.name,
      spotifyURL: searchResult.external_urls.spotify,
      type: type
    })
  }
  return function(dispatch) {
    fetch('/api/spotify/save', data)
  }
}
