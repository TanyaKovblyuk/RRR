const initialState = {
  user: {},
  avatar: '',
  statistics: {},
  friends: [],
  posts: [],
  comments: []
}

export default function current_user(state = initialState, action) {

  switch (action.type) {
    case 'SET_PROFILE':
      return Object.assign({}, action.payload )

    case 'SET_FRIENDS':
      return Object.assign({}, state, { friends: action.payload })

    case 'SET_POSTS':
      return Object.assign({}, state, { posts: action.payload })

    case 'SET_COMMENTS':
      return Object.assign({}, state, { comments: action.payload })

    default:
      return state;
  }

}
