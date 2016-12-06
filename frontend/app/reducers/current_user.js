const initialState = {
  id: '0',
  name: '',
  surname: ''
}

export default function currentUser(state = (loadState()? loadState() : initialState), action) {
  switch (action.type) {
    case 'SET_ID':
      return Object.assign({}, state, { id: action.payload })

    case 'SET_CURRENT_USER':
      return Object.assign({}, action.payload )

    default:
      return state;
  }
}


const loadState = () => {
  const serializedState = localStorage.getItem('current_user');
  return JSON.parse(serializedState);
}
