const profileState = {
  showProfile: false,
  profileID: '',
  name: '',
  email: '',
  likes: []
}

export function profileReducer(state=profileState, action) {
  switch(action.type) {
    case 'createProfile':
      return {
        showProfile: true,
        profileID: action.profileID
      }
    //when user sign up / log in with form; save user name and email
    case 'saveName':
      return {
        ...state,
        name: action.name,
        email: action.email
      }
    case 'signInSetID':
      return {
        ...state,
        profileID: action.profileID,
        showProfile: true
      }
    case 'saveLike':
      return {
        ...state,
        likes: action.likes
      }
    default:
      return state
  }
}

//get profile likes when ProfilePage mounts
export function logInReducer(state = false, action) {
  switch (action.type) {
    case 'signIn':
      return true
    default:
      return state
  }
}
