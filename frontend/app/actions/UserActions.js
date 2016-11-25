export function setId(id) {
  return {
    type: 'SET_ID',
    payload: id
  }
}

export function setCurrentUser(user) {
  return {
    type: 'SET_CURRENT_USER',
    payload: user
  }
}
