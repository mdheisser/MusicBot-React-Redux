import { combineReducers } from 'redux'
import {profileReducer, logInReducer} from './profileReducers'

function searchReducer(state={}, action) {
  switch (action.type) {
    case 'saveSearch':
      return action.result
    default:
      return state;
  }
}

function categoryReducer(state="track", action) {
  switch (action.type) {
    case 'saveCategory':
      return action.category;
    default:
      return state;
  }
}


const reducers = combineReducers({
  searchResults: searchReducer,
  profile: profileReducer,
  loggedIn: logInReducer,
  searchCategory: categoryReducer,
})

export default reducers
