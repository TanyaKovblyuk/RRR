const initialState = {
  user: {},
  avatar: '',
  statistics: {},
  friends: [],
  posts: [],
  comments: [],
  is_friend: false
}

export default function current_user(state = (loadState()? loadState() : initialState), action) {

  switch (action.type) {
    case 'SET_PROFILE':
      return Object.assign({}, action.payload )

    case 'SET_POSTS':
      return Object.assign({}, state, { posts: action.payload })

    case 'SET_COMMENTS':
      return Object.assign({}, state, { comments: action.payload })

    case 'SET_STATUS':
      return Object.assign({}, state, { is_friend: action.payload })

    default:
      return state;
  }

}

const loadState = () => {
  const serializedState = localStorage.getItem('profile');
  return JSON.parse(serializedState);
}
