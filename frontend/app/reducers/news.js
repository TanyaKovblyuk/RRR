const initialState = {
  news: []
}

export default function news(state = initialState, action) {

  switch (action.type) {
    case 'SET_NEWS':
      return Object.assign({}, state, { news: action.payload })

    default:
      return state;
  }

}
