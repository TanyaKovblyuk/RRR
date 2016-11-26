const initialState = {
  messages: []
}

export default function messages(state = initialState, action) {

  switch (action.type) {
    case 'SET_MESSAGES':
      return Object.assign({}, state, { messages: action.payload })

    default:
      return state;
  }

}
