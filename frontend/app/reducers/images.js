const initialState = {
  images: []
}

export default function images(state = initialState, action) {

  switch (action.type) {
    case 'SET_IMAGES':
      return Object.assign({}, state, { images: action.payload })

    default:
      return state;
  }

}
