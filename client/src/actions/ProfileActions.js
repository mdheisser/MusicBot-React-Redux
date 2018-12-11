function profileAction(profileID) {
  return {
    type: 'createProfile',
    profileID: profileID
  }
}

export function receiveError(error) {
  return {
    type: 'error',
    error: error
  }
}

function getRec(rec) {
  return {
    type: 'getRec',
    recommendation: rec
  }
}

function saveRecAction(rec) {
  return {
    type: 'saveRec',
    trackID: rec.trackID
  }
}

function likeAction(likes) {
  return {
    type: 'saveLike',
    likes: likes
  }
}

function signInAction(jsonResp) {
  return {
    type: 'signIn',
    name: jsonResp.name,
    likes: jsonResp.likes
  }
}

//create profile and save profile ID to state
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
    fetch(`/api/profiles`, fetchData).then(resp => resp.json())
    .then(json => dispatch(profileAction(json.id))).catch(
      error => dispatch(receiveError(error)))
  }
}

//persist the likes data (type and spotify id) to state
export function saveLike(trackSpotifyID, profileID) {
  const fetchData = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({spotifyID: trackSpotifyID})
  }
  return function(dispatch) {
    fetch(`/api/profiles/${profileID}/likes`, fetchData)
    .then(resp => resp.json())
    .then(json => dispatch(likeAction(json)))
  }
}

export function signIn(name, email, profileID) {
  const fetchData = {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: name,
      email: email
    })
  }
  return function(dispatch) {
    fetch(`/api/profiles/${profileID}/signin`, fetchData)
    .then(resp => resp.json())
    .then(json => dispatch(signInAction(json)))
  }
}
