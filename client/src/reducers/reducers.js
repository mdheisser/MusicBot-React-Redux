import { combineReducers } from 'redux'

function searchReducer(state={}, action) {
  switch (action.type) {
    case 'saveSearch':
      return action.result
    default:
      return state;
  }
}

function errorReducer(state='', action) {
  switch (action.type) {
    case 'error':
      return action.error
    default:
      return state;
  }
}

function profileIDReducer(state={showProfile: false, profileID: ''}, action) {
  switch(action.type) {
    case 'createProfile':
      return {
        showProfile: true,
        profileID: action.profileID
      }
    default:
      return state
  }
}

function likeReducer(state=[], action) {
  switch (action.type) {
    case 'saveLike':
      return action.likes;
    default:
      return state;
  }
}

const reducers = combineReducers({
  searchResults: searchReducer,
  error: errorReducer,
  profile: profileIDReducer,
  likes: likeReducer
})

export default reducers
