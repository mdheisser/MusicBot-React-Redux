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

//get profile likes when ProfilePage mounts
function logInReducer(state = false, action) {
  switch (action.type) {
    case 'signIn':
      return true
    default:
      return state
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

//when user sign up / log in with form; save user name and email to store
function profileNameReducer(state={}, action) {
  switch (action.type) {
    case 'saveName':
      return {
        name: action.name,
        email: action.email
      }
    default:
      return state
  }
}

const reducers = combineReducers({
  searchResults: searchReducer,
  error: errorReducer,
  profile: profileIDReducer,
  loggedIn: logInReducer,
  searchCategory: categoryReducer,
  profileName: profileNameReducer
})

export default reducers
