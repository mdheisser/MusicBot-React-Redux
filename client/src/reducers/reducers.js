import { combineReducers } from 'redux'

function authReducer(state='', action) {
  switch(action.type) {
    case 'authorize':
      return action.token
    default:
      return state
  }
}

function searchReducer(state=[], action) {
  switch (action.type) {
    case 'receiveSearch':
      return [
        ...state,
        {
          type: 'receiveSearch',
          results: action.result
        }
      ]
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
