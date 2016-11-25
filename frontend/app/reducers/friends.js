const initialState = {
  friends: []
}

export default function friends(state = initialState, action) {

  switch (action.type) {
    case 'SET_FRIENDS':
      return Object.assign({}, state, { friends: action.payload })

    default:
      return state;
  }

}
