function profileAction(profileID) {
  return {
    type: 'createProfile',
    profileID: profileID
  }
}

function receiveError(error) {
  return {
    type: 'error',
    error: error
  }
}

function getGenres(genres) {
  return {
    type: 'getGenres',
    genres: genres.split(', ')
  }
}

export function createProfile(trackIDs, artistIDs) {
  const fetchData = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(
      {
        tracks: trackIDs.join('%20'),
        artists: artistIDs.join('%20'),
      }
    )
  }
  return function(dispatch) {
    fetch(`api/profiles`, fetchData).then(resp => resp.json())
    .then(json => dispatch(profileAction(json.id))).catch(
      error => dispatch(receiveError(error)))
  }
}

export function receiveGenres(profileID) {
  return function(dispatch) {
    fetch(`api/profiles/${profileID}/genres`).then(resp => resp.json())
    .then(json => dispatch(getGenres(json.result)))
    .catch(error => dispatch(receiveError(error)))
  }
}
