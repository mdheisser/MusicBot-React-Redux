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

function recReducer(state={showRec: false, rec: {}}, action) {
  switch (action.type) {
    case 'getRec':
      return {
        showRec: true,
        rec: action.recommendation
      };
    default:
      return state;
  }
}

const reducers = combineReducers({
  searchResults: searchReducer,
  error: errorReducer,
  profile: profileIDReducer,
  recommendations: recReducer
})

export default reducers
