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

//get profile likes when ProfilePage mounts
function profileInfoReducer(state = {loggedIn: false}, action) {
  switch (action.type) {
    case 'signIn':
      return {
        name: action.name,
        likes: action.likes,
        loggedIn: true
      }
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
  likes: likeReducer,
  profileInfo: profileInfoReducer,
  searchCategory: categoryReducer,
  profileName: profileNameReducer
})

export default reducers
