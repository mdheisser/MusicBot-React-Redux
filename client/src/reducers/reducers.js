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
          status: action.result.status,
          error: action.error,
          results: action.results
        }
      ]
    default:
      return state;
  }
}

function errorReducer(state='', action) {

}

const reducers = combineReducers({
  auth: authReducer,
  searchResults: searchReducer
})

export default reducers
