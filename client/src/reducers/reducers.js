import { combineReducers } from 'redux'

function searchReducer(state={'form-1': {}, 'form-2': {}}, action) {
  switch (action.type) {
    case 'saveSearch':
      if(action.keyProp === 'form-1') {
        return {
          ...state,
          'form-1': action.result
        }
      } else {
        return {
          ...state,
          'form-2': action.result
        }
      }
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

function profileIDReducer(state='', action) {
  switch(action.type) {
    case 'createProfile':
      return action.profileID
    default:
      return state
  }
}

function genresReducer(state=[], action) {
  switch (action.type) {
    case 'getGenres':
      return action.genres;
    default:
      return state;
  }
}

const reducers = combineReducers({
  searchResults: searchReducer,
  error: errorReducer,
  profileID: profileIDReducer,
  genres: genresReducer
})

export default reducers
