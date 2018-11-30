import { combineReducers } from 'redux'

function authReducer(state='', action) {
  switch(action.type) {
    case 'authorize':
      return action.token
    default:
      return state
  }
}

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

const reducers = combineReducers({
  auth: authReducer,
  searchResults: searchReducer,
  error: errorReducer
})

export default reducers
